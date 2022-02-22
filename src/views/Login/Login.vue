<template>
  <AppContent>
    <form class="login" @submit.prevent="onSubmitLogin">
      <div class="login__form-field-group">
        <label for="email">E-mail:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Digite seu email"
          ref="email"
          v-model="usuario.email"
          @click="clearErrorLogin"
        />
        <div class="message__error--user" v-show="messageErrorEmail">
          Email inválido, utilize o email cadastrado ou vá para 'Cadastrar'.
        </div>
      </div>
      <div class="login__form-field-group">
        <label for="senha">Senha:</label>
        <input
          type="password"
          class="form-control"
          placeholder="Digite sua senha"
          v-model="usuario.senha"
          @click="clearErrorLogin"
        />
        <div class="message__error--user" v-show="messageErrorPassword">
          Senha não informada.
        </div>
      </div>
      <div class="message__error--request" v-if="messageErrorRequest">
        Você digitou um login ou senha inválido(s). Tente novamente.
      </div>
      <div class="message__error--offline" v-if="messageErrorOffLine">
        Servidor indisponível no momento, tente novamente mais tarde.
      </div>

      <Button name="Login" symbol="bi bi-box-arrow-in-right" />

      <router-link to="/NewUser">
        <p>Se você não possui cadastro, cadastre-se aqui!</p>
      </router-link>
    </form>
  </AppContent>
</template>

<script>
import AppContent from "@/components/templates/AppContent";
import Button from "@/components/shared/Button";

export default {
  components: {
    AppContent,
    Button,
  },

  data() {
    return {
      usuario: {
        email: "",
        senha: "",
      },
      messageErrorPassword: null,
      messageErrorEmail: null,
      messageErrorRequest: null,
      messageErrorOffLine: null,
    };
  },
  methods: {
    onSubmitLogin() {
      if (this.validateEmail() && this.validatePassword()) {
        this.doLogin();
      }
    },

    //Validate Login
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
      if (this.usuario.senha !== "") {
        return true;
      } else {
        this.messageErrorPassword = true;
      }
    },
    clearErrorLogin() {
      this.messageErrorName = false;
      this.messageErrorEmail = false;
      this.messageErrorPassword = false;
      this.messageErrorOffLine = false;
    },

    //commit: chama uma mutation do Vuex
    //dispacth: chama uma action
    doLogin() {
      this.$store
        .dispatch("doLoginStore", this.usuario)
        .then(() => {
          this.$router.push({ name: "Cadastrar Pedidos" });
          this.messageError = "";
        })
        .catch((error) => {
          if (error.request.status === 401) {
            this.messageErrorRequest = true;
            this.usuario.email = "";
            this.usuario.senha = "";
            this.focusInput();
          } else {
            this.messageErrorOffLine = true;
            this.usuario.email = "";
            this.usuario.senha = "";
            this.focusInput();
          }
        });
    },
    focusInput() {
      this.$refs.email.focus();
    },
  },
  mounted() {
    this.focusInput();
  },
};
</script>

<style lang="scss" scoped>
.login {
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
  .message__error--user {
    color: var(--message-error-color);
    padding-top: 0.5rem;
  }

  .message__error--request,
  .message__error--offline {
    color: var(--message-error-color);
    padding: 0.5rem;
    margin: 0 auto 1rem auto;
    max-width: 50%;
    text-align: center;
  }
}

@media (min-width: 768px) {
  .login p:hover {
    color: var(--text-color-3-hover);
  }
}

@media (max-width: 768px) {
  .login {
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
    .message__error {
      font-size: 0.8rem;
      padding: 0.5rem;
    }
  }
}
</style>