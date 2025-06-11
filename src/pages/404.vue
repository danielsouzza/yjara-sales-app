<template>
  <f7-page class="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-bg-gradient-to-br tw-from-primary/10 tw-to-white tw-pt-10">
    <div class="tw-bg-white tw-rounded-3xl tw-shadow-2xl tw-p-10 tw-flex tw-flex-col tw-items-center tw-gap-4 tw-max-w-md tw-mx-auto">
      <svg class="tw-w-24 tw-h-24 tw-text-primary" fill="none" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="4" fill="#f3f4f6"/>
        <text x="32" y="44" text-anchor="middle" font-size="32" fill="#6f6ee8" font-weight="bold">404</text>
      </svg>
      <h1 class="tw-text-3xl tw-font-bold tw-text-primary tw-mt-2">Página não encontrada</h1>
      <p class="tw-text-gray-500 tw-text-center">
        O conteúdo que você procura não existe ou foi removido.<br>
        Verifique o endereço ou volte para a página inicial.
      </p>
      <f7-link href="/" class="tw-mt-4 tw-bg-primary tw-text-white tw-px-6 tw-py-2 tw-rounded-xl tw-font-bold tw-shadow hover:tw-bg-primary/90 tw-transition">
        Voltar para o início
      </f7-link>
    </div>
  </f7-page>
</template>

<script>
export default {};
</script>
