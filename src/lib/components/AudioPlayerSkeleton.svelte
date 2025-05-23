<script>
    let { src } = $props();
    import { Progress } from "@skeletonlabs/skeleton-svelte";

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
        <div class="w-full h-full pl-10">
            <Progress
                value={50}
                max={100}
                on:pointerdown={(e) => {
                    const div = e.currentTarget;

                    function seek(e) {
                        // TODO update the time
                        time = p * duration;
                        progress = time / duration;
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
                }}>50%</Progress
            >
        </div>
        <div class="flex flex-col">
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

    <style>
        #player {
            display: grid;
            grid-template-columns: 2.5em 1fr;
            align-items: center;
            gap: 1em;
            padding: 0.5em 1em 0.5em 0.5em;
            border-radius: 2em;
            background: var(--bg-1);
            transition: filter 0.2s;
            color: var(--fg-3);
            user-select: none;
        }

        #player:not(.paused) {
            color: var(--fg-1);
            filter: drop-shadow(0.5em 0.5em 1em rgba(0, 0, 0, 0.1));
        }

        [aria-label="pause"] {
            background-image: url(/pause.svg);
        }

        [aria-label="play"] {
            background-image: url(/play.svg);
        }

        #info {
            overflow: hidden;
        }

        #time {
            display: flex;
            align-items: center;
            gap: 0.5em;
        }

        #time span {
            font-size: 0.7em;
        }

        #slider {
            flex: 1;
            height: 0.5em;
            background: var(--bg-2);
            border-radius: 0.5em;
            overflow: hidden;
        }

        #progress {
            width: calc(100 * var(--progress));
            height: 100%;
            background: var(--bg-3);
        }
    </style>
</div>
