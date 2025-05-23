<script>
    let { src } = $props();

    let time = $state(0);
    let duration = $state(0);
    let paused = $state(true);

    let img = $state("/play.svg");

    let progress = $state(0);

    function format(time) {
        if (isNaN(time)) return "...";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
</script>

<div class="flex flex-col justify-center items-center">
    <div class="flex flex-row justify-center align-items w-[70%]">
        <audio {src} bind:currentTime={time} bind:duration bind:paused></audio>
        <button
            class="flex-col justify-center items-center w-[10%] bg-no-repeat"
            src={img}
            aria-label={paused ? "play" : "pause"}
            onclick={() => (paused = !paused)}
        >
        </button>
        <div class="flex flex-col">
            <div
                class="h-2 bg-gray-400 rounded-full"
                onpointerdown={(e) => {
                    const div = e.currentTarget;

                    function seek(e) {
                        const { left, width } = div.getBoundingClientRect();

                        let p = (e.clientX - left) / width;
                        if (p < 0) p = 0;
                        if (p > 1) p = 1;

                        // TODO update the time
                        time = p * duration;
                        progress = 100 * (time / duration);
                    }

                    seek(e);

                    window.addEventListener("pointermove", seek);

                    window.addEventListener(
                        "pointerup",
                        () => {
                            window.removeEventListener("pointermove", seek);
                        },
                        {
                            once: true,
                        },
                    );
                }}
            >
                <div style="--progress: {time / duration}"></div>
                ------------------------------------------
            </div>
            <div class="flex flex-row">
                <div class="grow text-left">{format(time)}</div>
                <div class="grow text-right">03</div>
            </div>
        </div>
    </div>

    <div class="h-fit" id={["player", { paused }]}>
        <audio {src} bind:currentTime={time} bind:duration bind:paused></audio>
        <button
            id="play"
            aria-label={paused ? "play" : "pause"}
            onclick={() => (paused = !paused)}
        ></button>

        <div id="info">
            <div id="time">
                <span>{format(time)}</span>
                <div
                    id="slider"
                    onpointerdown={(e) => {
                        const div = e.currentTarget;

                        function seek(e) {
                            const { left, width } = div.getBoundingClientRect();

                            let p = (e.clientX - left) / width;
                            if (p < 0) p = 0;
                            if (p > 1) p = 1;

                            // TODO update the time
                            time = p * duration;
                        }

                        seek(e);

                        window.addEventListener("pointermove", seek);

                        window.addEventListener(
                            "pointerup",
                            () => {
                                window.removeEventListener("pointermove", seek);
                            },
                            {
                                once: true,
                            },
                        );
                    }}
                >
                    <div
                        id="progress"
                        style="--progress: {time / duration}%"
                    ></div>
                </div>
                <span>{duration ? format(duration) : "--:--"}</span>
            </div>
        </div>
    </div>
</div>

<style>
    #progress {
        width: calc(100 * var(--progress));
        height: 100%;
        background-color: blue;
    }
</style>
