<template>
  <div class="cartao-viagem">
    <div class="localidades ">
      <span class="text-start"><span class="label-local">Saindo de<br></span> {{ viagem.municipio_origem.nome }}/{{ viagem.municipio_origem.uf }}</span>
      <span class="text-end"><span class="label-local">Indo para<br></span> {{ viagem.municipio_destino.nome }}/{{ viagem.municipio_destino.uf }}</span>
    </div>
    <div class="linha-seta">
      <span class="ponto"></span>
      <span class="linha-tracejada"></span>
      <span class="seta-meio">→</span>
      <span class="linha-tracejada"></span>
      <span class="ponto"></span>
    </div>
    <div class="infos-cartao">
      <div>
        <div class="label">Saída</div>
        <div class="valor">{{ formatarData(viagem.data_embarque) }}</div>
      </div>
      <div>
        <div class="label">Duração</div>
        <div class="valor">{{ formatarTempoViagem(viagem.tempo_viagem) }}</div>
      </div>
    </div>
    <div class="rodape-cartao">
      <span class="embarcacao">{{ viagem.embarcacao }}</span>
      <span class="preco">{{formatCurrency(calcularValor(valor, viagem.desconto?.desconto))}}<span class="tw-text-p tw-text-[10px]"> no PIX</span></span>
    </div>
    <f7-button
        class="btn-selecionar-comodo"
        fill
        @click="selecionarViagem"
      >Selecionar Cômodo</f7-button>
  </div>
  
</template>

<script setup>
import { formatarTempoViagem ,formatCurrency, calcularValor, formatMoney} from '@/js/utils';
import { computed } from 'vue';


const props = defineProps({
  viagem: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['selecionar']);
function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const valor = computed(()=>{
  return formatMoney(props.viagem?.valor) + formatMoney(props.viagem?.taxa_de_embarque);
})

function selecionarViagem() {
  emit('selecionar', props.viagem);
}
</script>

<style scoped>
.cartao-viagem {
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 24px 20px;
  color: #222;
  width: fill;
  margin: 0 auto;
}
.localidades {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #575656;
  font-weight: 600;
  margin-bottom: 16px;
}
.text-start {
  flex: 1;
  text-align: left;
}
.text-end {
  flex: 1;
  text-align: right;
}
.linha-seta {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0 16px 0;
  position: relative;
}
.ponto {
  width: 18px;
  height: 18px;
  background: #b0c4de;
  border: 5px solid #e3f2fd;
  border-radius: 50%;
  z-index: 2;
}
.linha-tracejada {
  flex: 1;
  border-top: 2px dashed #b0c4de;
  height: 0;
  margin: 0 2px;
  z-index: 1;
}
.seta-meio {
  font-size: 28px;
  color: #90caf9;
  margin: 0 6px;
  z-index: 2;
  background: #f9fafb;
  padding: 0 2px;
  margin-bottom: 5px;
}
.infos-cartao {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.label {
  font-size: 12px;
  font-weight: 500;
  color: #868686;
}
.valor {
  font-size: 15px;
  font-weight: 500;
  color: #222;
}
.rodape-cartao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #e0e0e0;
  padding-top: 10px;
  margin-top: 10px;
}
.embarcacao {
  color: #00579d;
}
.preco {
  font-weight: bold;
  color: #2196F3;
  font-size: 16px;
}
.label-local {
  font-size: 12px;
  color: #868686;
  font-weight: 500;
  margin-right: 4px;
}
</style> 