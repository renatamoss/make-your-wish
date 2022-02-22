<template>
  <AppContent>
    <form class="new-user" method="POST" @submit.prevent="onSubmitNewUser">
      <div class="new-user__form-field-group">
        <label for="email">Nome:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Digite seu nome completo"
          ref="nome"
          v-model="usuario.nome"
          @click="clearErrorNewUSer"
        />
        <div class="message__error" v-show="messageErrorName">
          Digite seu nome completo, de 6 a 30 caracteres.
        </div>
      </div>
      <div class="new-user__form-field-group">
        <label for="email">E-mail:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Digite seu email"
          v-model="usuario.email"
          @click="clearErrorNewUSer"
        />
        <div class="message__error" v-show="messageErrorEmail">
          Digite um email válido.
        </div>
      </div>
      <div class="new-user__form-field-group">
        <label for="senha">Escolha uma Senha:</label>
        <input
          type="password"
          class="form-control"
          placeholder="De 8 à 12 caracteres, pelo menos uma letra e um número."
          v-model="usuario.senha"
          @click="clearErrorNewUSer"
        />
        <div class="message__error" v-show="messageErrorPassword">
          Digite uma senha válida, de 8 a 12 caracteres, pelo menos uma letra e
          um número.
        </div>
      </div>

      <div class="message__error--request" v-show="messageErrorRequest">
        Servidor indisponível no momento, tente novamente mais tarde.
      </div>

      <Button name="Cadastrar" symbol="bi bi-person-plus" />

      <Message :messageBox="messageNewUser" v-show="messageNewUser" />

      <router-link to="/">
        <p>Se você já tem cadastro, faça o login aqui!</p>
      </router-link>
    </form>
  </AppContent>
</template>

<script>
import AppContent from "@/components/templates/AppContent";
import Button from "@/components/shared/Button";
import Message from "@/components/shared/Message";

export default {
  components: {
    AppContent,
    Button,
    Message,
  },
  data() {
    return {
      usuario: {
        nome: "",
        email: "",
        senha: "",
      },
      mensagemErro: null,
      messageNewUser: null,
      messageErrorName: null,
      messageErrorPassword: null,
      messageErrorEmail: null,
      messageErrorRequest: null,
    };
  },
  methods: {
    onSubmitNewUser() {
      if (
        this.validateName() &&
        this.validateEmail() &&
        this.validatePassword()
      ) {
        this.registerNewUSer();
      } else {
        return false;
      }
    },

    //ValidadeNewUser
    validateName() {
      if (this.usuario.nome.length >= 6 && this.usuario.nome.length <= 30) {
        return true;
      } else {
        this.messageErrorName = true;
      }
    },
    validateEmail() {
      if (
        this.usuario.email !== "" &&
        this.usuario.email.indexOf("@") !== -1 &&
        this.usuario.email.indexOf(".") !== -1
      ) {
        return true;
      } else {
        this.messageErrorEmail = true;
      }
    },
    validatePassword() {
      if (/^(?=.*[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])(?=.*[0-9]).{8,12}$/.test(this.usuario.senha)) {
        return true;
      } else {
        this.messageErrorPassword = true;
      }
    },
    clearErrorNewUSer() {
      this.messageErrorName = false;
      this.messageErrorEmail = false;
      this.messageErrorPassword = false;
    },

    //registerNewUSer
    registerNewUSer() {
      this.$http
        .post("auth/register", this.usuario)
        .then(() => {
          this.messageNewUser = `Cadastro realizado com sucesso.`;
          setTimeout(() => this.$router.push({ name: "Login" }), 3000);
        })
        .catch(() => (this.messageErrorRequest = true));
      this.usuario.nome = "";
      this.usuario.email = "";
      this.usuario.senha = "";
      this.focusInput();
    },
    focusInput() {
      this.$refs.nome.focus();
    },
  },
  mounted() {
    this.focusInput();
  },
};
</script>

<style lang="scss" scoped>
.new-user {
  margin: 0 auto;
  max-width: 780px;

  &__form-field-group {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;

    label {
      border-left: 0.3rem solid var(--border-color-2);
      color: var(--text-color-1);
      font-weight: bold;
      margin-bottom: 1rem;
      padding: 0.5rem;
    }

    input {
      background-color: var(--bg-color-2);
      padding: 0.5rem;
      width: 100%;
    }
  }

  p {
    color: var(--title-color-1);
    font-size: 1rem;
    margin: 1rem;
    text-align: center;
    text-decoration: underline;
    transition: 0.2s;
  }

  .message__error {
    color: var(--message-error-color);
    padding-top: 0.5rem;
  }

  .message__error--request {
    color: var(--message-error-color);
    padding-bottom: 1rem;
    text-align: center;
  }
}
@media (min-width: 768px) {
  .new-user p:hover {
    color: var(--text-color-3-hover);
  }
}

@media (max-width: 768px) {
  .new-user {
    &__form-field-group {
      font-size: 0.8rem;
      margin-bottom: 0.5rem;

      label {
        margin-bottom: 0.5rem;
      }
    }
    p {
      font-size: 0.8rem;
    }
  }
}
</style>