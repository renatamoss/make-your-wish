<template>
  <AppContent>
    <Message :messageBox="messageMakeWish" v-show="messageMakeWish" />

    <div v-if="produtos" v-show="produtos">
      <form class="make-wish" method="POST" @submit.prevent="onSubmitCreatWish">
        <div class="make-wish__form-box">
          <div class="make-wish__form-box-columm">
            <FormFieldText
              label="CLIENTE*"
              type="text"
              v-model="nome"
              placeholder="Digite o nome completo"
              @click="clearMessageError"
            />
            <div class="message__error--fields" v-show="message_error_name">
              Campo inválido, digite o nome completo.
            </div>

            <FormFieldText
              label="Telefone*"
              type="number"
              v-model="telefone"
              placeholder="Digite o telefone com DDD"
              @click="clearMessageError"
            />
            <div class="message__error--fields" v-show="message_error_phone">
              Campo inválido, digite o telefone com DDD.
            </div>

            <FormFieldText
              label="Endereço de Entrega*"
              type="text"
              v-model="endereco"
              placeholder="Digite a Rua e Número"
              @click="clearMessageError"
            />
            <div class="message__error--fields" v-show="message_error_adress">
              Campo inválido, digite a Rua e Número.
            </div>

            <FormFieldText
              label="Bairro*"
              type="text"
              v-model="bairro"
              placeholder="Digite o Bairro"
              @click="clearMessageError"
            />
            <div class="message__error--fields" v-show="message_error_district">
              Campo inválido, digite o Bairro.
            </div>
          </div>

          <div class="make-wish__form-box-columm">
            <FormFieldOption
              nameProducto="HAMBURGUER"
              descriptionOption="Selecione o tipo de pão"
              v-model="pao"
              :productos="paes"
            />

            <FormFieldCheckbox nameProducto="Tipos de Carnes:">
              <div
                class="list-checkbox"
                v-for="carne in carnesdata"
                :key="carne.id"
              >
                <input
                  type="checkbox"
                  name="carnes"
                  v-model="carnes"
                  :value="carne.tipo"
                />
                <span>{{ carne.tipo }}</span>
              </div>
            </FormFieldCheckbox>

            <FormFieldCheckbox nameProducto="Recheios opcionais:">
              <div
                class="list-checkbox"
                v-for="opcional in opcionaisdata"
                :key="opcional.id"
              >
                <input
                  type="checkbox"
                  name="opcionais"
                  v-model="opcionais"
                  :value="opcional.tipo"
                />
                <span>{{ opcional.tipo }}</span>
              </div>
            </FormFieldCheckbox>
          </div>

          <div class="make-wish__form-box-columm">
            <FormFieldOption
              nameProducto="BATATA PALITO"
              descriptionOption="Selecione o tamanho da batata"
              v-model="batata"
              :productos="batatas"
            />

            <FormFieldOption
              nameProducto="BEBIDA"
              descriptionOption="Selecione o tipo de bebida"
              v-model="bebida"
              :productos="bebidas"
            />

            <FormFieldCheckbox nameProducto="Preferência de bebida:">
              <div
                class="list-checkbox"
                v-for="tipoBebida in tipoBebidasData"
                :key="tipoBebida.id"
              >
                <input
                  type="checkbox"
                  name="opcionais"
                  v-model="tipoBebidas"
                  :value="tipoBebida.tipo"
                />
                <span>{{ tipoBebida.tipo }}</span>
              </div>
            </FormFieldCheckbox>

            <FormFieldOption
              nameProducto="SORVETE"
              descriptionOption="Escolha de sorvete"
              v-model="sorvete"
              :productos="sorvetes"
            />
          </div>
        </div>

        <div class="register__required">*Campos obrigatórios.</div>

        <Button name="Cadastrar" symbol="pencil-square" />
      </form>
    </div>

    <div v-else v-show="message_server_error">
      <ErrorServidorContent
        message_server_error="Sistema indisponível no momento, tente novamente mais tarde."
      />
    </div>
  </AppContent>
</template>

<script>
import AppContent from "@/components/templates/AppContent";
import Message from "@/components/shared/Message";
import FormFieldText from "@/components/shared/Form/FormFieldText";
import FormFieldOption from "@/components/shared/Form/FormFieldOption";
import FormFieldCheckbox from "@/components/shared/Form/FormFieldCheckbox";
import Button from "@/components/shared/Button";
import ErrorServidorContent from "@/components/shared/ErrorServidorContent.vue";

export default {
  components: {
    AppContent,
    Message,
    FormFieldText,
    FormFieldOption,
    FormFieldCheckbox,
    Button,
    ErrorServidorContent,
  },
  data() {
    return {
      nome: "",
      telefone: "",
      endereco: "",
      bairro: "",

      //trás da api para preencher na home
      paes: "",
      batatas: "",
      bebidas: "",
      sorvetes: "",
      carnesdata: [],
      opcionaisdata: [],
      tipoBebidasData: [],

      //v-model, envia para api
      produtos: true,
      pao: "",
      batata: "",
      bebida: "",
      sorvete: "",
      carnes: [],
      opcionais: [],
      tipoBebidas: [],
      status: "Solicitado",

      messageMakeWish: null,

      //Validade fields
      message_error_name: null,
      message_error_phone: null,
      message_error_adress: null,
      message_error_district: null,

      message_server_error: null,
    };
  },
  methods: {
    onSubmitCreatWish() {
      if (
        this.validateName() &&
        this.validatePhone() &&
        this.validateAdress() &&
        this.validateDistrict()
      ) {
        this.createWish();
      }
    },

    //Validates:
    validateName() {
      if (
        /^(?=.*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])(?!.*[0-9])(?!.*[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{3,30}$/.test(
          this.nome
        )
      ) {
        return true;
      } else {
        this.message_error_name = true;
      }
    },
    validatePhone() {
      if (
        /^(?!.*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])(?=.*[0-9])(?!.*[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{6,14}$/.test(
          this.telefone
        )
      ) {
        return true;
      } else {
        this.message_error_phone = true;
      }
    },

    validateAdress() {
      if (
        /^(?=.*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])(?=.*[0-9])(?!.*[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{3,30}$/.test(
          this.endereco
        )
      ) {
        return true;
      } else {
        this.message_error_adress = true;
      }
    },
    validateDistrict() {
      if (
        /^(?=.*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])(?!.*[0-9])(?!.*[#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{3,20}$/.test(
          this.bairro
        )
      ) {
        return true;
      } else {
        this.message_error_district = true;
      }
    },
    clearMessageError() {
      this.message_error_name = false;
      this.message_error_phone = false;
      this.message_error_adress = false;
      this.message_error_district = false;
    },

    //método chamado no mounted()
    async getPedidos() {
      //trazendo os dados da api, transformando em json:
      try {
        const req = await fetch(
          "https://api-data-make-your-wish.herokuapp.com/produtos"
        );
        // const req = this.$http.get('produtos')

        const data = await req.json();

        this.paes = data.paes;
        this.batatas = data.batatas;
        this.bebidas = data.bebidas;
        this.sorvetes = data.sorvetes;

        //arrays:
        this.carnesdata = data.carnes;
        this.tipoBebidasData = data.tipoBebidas;
        this.opcionaisdata = data.opcionais;
      } catch (err) {
        this.produtos = false;
        this.message_server_error = true;
        console.log(`Erro na resposta do servidor` + err);
      }
    },

    //submite formulário
    async createWish() {
      try {
        //dados preenchidos no formulário:
        const data = {
          nome: this.nome,
          telefone: this.telefone,
          endereco: this.endereco,
          bairro: this.bairro,

          pao: this.pao,
          batata: this.batata,
          bebida: this.bebida,
          sorvete: this.sorvete,

          //arrays:
          carnes: Array.from(this.carnes),
          opcionais: Array.from(this.opcionais),
          tipoBebidas: Array.from(this.tipoBebidas),

          status: "Solicitado",
        };

        //transformado os dados objetos data em JSON(texto):
        const dataJson = await JSON.stringify(data);

        //fazendo a requisição, INSERINDO os dados no servidor: POST:
        const req = await fetch(
          "https://api-data-make-your-wish.herokuapp.com/pedidos",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataJson,
          }
        );

        //resposta do banco com inserção do dados:
        const res = await req.json();

        //msg finalização pedido, chamando dentro do método:
        this.messageMakeWish = `Pedido Nº. ${res.id} realizado com sucesso!`;

        // clear message após time
        setTimeout(() => (this.messageMakeWish = ""), 3000);

        // limpar campos
        this.nome = "";
        this.telefone = "";
        this.endereco = "";
        this.bairro = "";

        this.pao = "";
        this.batata = "";
        this.bebida = "";
        this.sorvete = "";

        //arrays:
        this.carnes = [];
        this.opcionais = [];
        this.tipoBebidas = [];
      } catch (err) {
        this.produtos = false;
        console.log(`Erro na resposta do servidor` + err);
      }
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>

<style lang="scss" scoped>
.make-wish__form-box {
  display: flex;

  &-columm {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-width: 33%;
    padding: 0 0.5rem;

    .message__error--fields {
      color: var(--message-error-color);
      padding-bottom: 0.5rem;
      margin-top: -0.5rem;
    }
  }

  .list-checkbox {
    display: flex;
    align-items: center;

    padding-top: 0.5rem;
    width: 50%;

    input {
      width: auto;
    }

    span {
      margin-left: 0.5rem;
      width: auto;
    }
  }
}

.register__required {
  margin-bottom: 1rem;
  text-align: center;
}

.message__error-request {
  color: var(--message-error-color);
  padding-top: 1rem;
  text-align: center;
}

@media (max-width: 1200px) {
  .make-wish__form-box {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .make-wish__form-box {
    font-size: 0.8rem;
  }
}
</style>