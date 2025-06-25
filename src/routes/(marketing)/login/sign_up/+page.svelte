<script lang="ts">
    import { Auth } from "@supabase/auth-ui-svelte";
    import { sharedAppearance } from "../login_config";

    let { data } = $props();
</script>

<svelte:head>
    <title>Sign up</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Sign Up</h1>
<Auth
    redirectTo={`${data.url}/auth/callback`}
    view="sign_up"
    supabaseClient={data.supabase}
    providers={["github", "google", "azure"]}
    socialLayout="horizontal"
    showLinks={false}
    providerScopes={{ azure: "profile,email" }}
    appearance={sharedAppearance}
    onlyThirdPartyProviders={true}
    additionalData={undefined}
/>
<div class="text-l text-slate-800 mt-4 mb-2">
    Have an account? <a class="underline" href="/login/sign_in">Sign in</a>.
</div>
