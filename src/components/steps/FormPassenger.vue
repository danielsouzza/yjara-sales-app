<template>
  <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-mb-6 tw-border tw-border-gray-100 ">
    <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
      <h3 class="tw-font-bold tw-text-lg tw-text-gray-800">Passageiro {{ index + 1 }}</h3>
      <div class="tw-flex tw-items-center tw-gap-2">
        <button
          v-if="form.qtd_comodos_filhos < form.comodos_filhos"
          @click="$emit('addComodoRelated')"
          type="button"
          class="tw-bg-green-500 hover:tw-bg-green-600 tw-text-white tw-px-3 tw-py-2 tw-rounded-lg tw-text-sm tw-flex tw-items-center tw-gap-2"
          title="Adicionar acompanhante"
        >
          <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </button>
        <button
          v-if="form.comodo_relacionado != null"
          @click="$emit('remover', index)"
          type="button"
          class="tw-bg-red-500 hover:tw-bg-red-600 tw-text-white tw-px-3 tw-py-2 tw-rounded-lg tw-text-sm tw-flex tw-items-center tw-gap-2"
          title="Remover passageiro"
        >
          <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <div class="tw-space-y-6">
      <!-- Tipo de Documento -->
      <div>
        <CustomSelect
          :searchable="false"
          v-model="form.tipo_doc"
          label="Tipo de Documento"
          :required="true"
          placeholder="Selecione o tipo de documento"
          :options="tiposDoc.map(doc => ({ value: doc.id, label: doc.nome }))"
        />
      </div>

      <!-- Número do Documento -->
      <div>
        <label class="custom-select-label">Nº do documento</label>
        <div class="onboarding-search" :class="{'tw-border-red-500': form.errors.document}">
          <span class="onboarding-search-icon">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
          </span>
          <input
            type="text"
            :key="form.tipo_doc"
            v-model="form.document"
            required
            v-mask-doc="form.tipo_doc ? tiposDoc[form.tipo_doc-1]?.mask : '###########'"
            placeholder="Digite o número do documento"
            class="onboarding-search-input"
            :class="{'tw-text-red-600': form.errors.document}"
          />
        </div>
        <p v-if="form.errors.document" class="tw-mt-1 tw-text-xs tw-text-red-600">{{ form.errors.document }}</p>
      </div>

      <!-- Nome completo -->
      <div>
        <label class="custom-select-label">Nome completo</label>
        <div class="onboarding-search" :class="{'tw-border-red-500': form.errors.nome}">
          <span class="onboarding-search-icon">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
          </span>
          <input
            type="text"
            v-model="form.nome"
            required
            placeholder="Digite o nome completo"
            class="onboarding-search-input"
            :class="{'tw-text-red-600': form.errors.nome}"
          />
        </div>
        <p v-if="form.errors.nome" class="tw-mt-1 tw-text-xs tw-text-red-600">{{ form.errors.nome }}</p>
      </div>

      <!-- Telefone -->
      <div>
        <label class="custom-select-label">Telefone</label>
        <div class="onboarding-search" :class="{'tw-border-red-500': form.errors.telefone}">
          <span class="onboarding-search-icon">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
          </span>
          <input
            v-mask-doc="'(##) #####-####'"
            v-model="form.telefone"
            placeholder="(00) 00000-0000"
            class="onboarding-search-input"
            :class="{'tw-text-red-600': form.errors.telefone}"
          />
        </div>
        <p v-if="form.errors.telefone" class="tw-mt-1 tw-text-xs tw-text-red-600">{{ form.errors.telefone }}</p>
      </div>

      <!-- Data de Nascimento -->
      <div>
        <DateSelectCustom
          v-model="form.nascimento"
          :max-date="new Date()"
          label="Data de Nascimento"
          placeholder="Selecione a data de nascimento"
          :error="!!form.errors.nascimento"
          :error-message="form.errors.nascimento"
        />
      </div>
    </div>

    <!-- Checkbox para adicionar como contato -->
    <div class="tw-mt-6 tw-flex tw-items-center tw-gap-3">
      <div class="tw-relative tw-flex tw-items-center">
        <input
          :id="'isContact-' + index"
          type="checkbox"
          v-model="form.isContact"
          @change="(event) => {
            if(event.target.checked) {
              emit('addToContact', index)
            } else {
              emit('removeFromContact', index)
            }
          }"
          class="tw-w-5 tw-h-5 tw-text-blue-600 tw-bg-gray-100 tw-border-[#bdbdbd] tw-rounded focus:tw-ring-blue-500 focus:outline-none focus:ring-2"
        />
      </div>
      <label :for="'isContact-' + index" class="tw-text-sm tw-text-gray-700 tw-cursor-pointer">
        Adicionar como contato
      </label>
    </div>
  </div>
</template>

<script setup>
import CustomSelect from '../ui/CustomSelect.vue'
import DateSelectCustom from '../ui/DateSelectCustom.vue'

const props = defineProps({
  form: Object,
  index: Number,
  type: String
});

const emit = defineEmits(['addToContact', 'removeFromContact', 'remover', 'addComodoRelated']);
const tiposDoc = [
  { id: 1, nome: 'RG', tamanho: 15, mask: '###############' },
  { id: 2, nome: 'Titulo de Eleitor', tamanho: 12, mask: '#### #### ####' },
  { id: 3, nome: 'Passaporte', tamanho: 20, mask: '#################' },
  { id: 4, nome: 'CNH', tamanho: 11, mask: '###########' },
  { id: 5, nome: 'CPF', tamanho: 0, mask: '###.###.###-##' }
];
</script>

<style scoped>

.custom-select-label {
  font-size: 1rem;
  font-weight: 600;
  color: #00579d;
  margin-bottom: 0.25rem;
}

/* Cada input dentro de uma div com borda, igual ao select da imagem. Borda vermelha em erro. */
.onboarding-search {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 9999px;
  box-shadow: 0 1px 4px 0 rgba(160, 174, 192, 0.08);
  padding: 0.25rem 1rem 0.25rem 0.75rem;
  border: 1.5px solid #f3f4f6;
  transition: border 0.2s;
  width: 100%;
}
.onboarding-search:focus-within {
  border: 1.5px solid #6f6ee8;
}
.onboarding-search-icon {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}
.onboarding-search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #333;
  width: 100%;
  padding: 0.5rem 0;
  font-weight: 500;
}
.onboarding-search-input::placeholder {
  color: #b0b0b0;
  opacity: 1;
}
</style>