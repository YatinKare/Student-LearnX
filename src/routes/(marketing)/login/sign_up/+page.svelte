<script lang="ts">
    import { Auth } from "@supabase/auth-ui-svelte";
    import { sharedAppearance } from "../login_config";
</script>

<svelte:head>
    <title>Sign up</title>
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Sign Up</h1>
<Auth
    view="sign_up"
    showLinks={false}
    socialLayout="horizontal"
    additionalData={undefined}
    appearance={sharedAppearance}
/>
<div class="text-l text-slate-800 mt-4 mb-2">
    Have an account? <a class="underline" href="/login/sign_in">Sign in</a>.
</div>
