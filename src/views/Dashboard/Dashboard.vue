<template>
  <AppContent>
    <Message
      v-if="pedidos"
      :messageBox="message_remove_wish"
      v-show="message_remove_wish"
    />
    <Message
      v-if="pedidos"
      :messageBox="message_update_wish"
      v-show="message_update_wish"
    />

    <div class="dashboard">
      <div class="dashboard___box" v-for="pedido in pedidos" :key="pedido.id">
        <div class="box__head">
          <p>PEDIDO Nº: 000{{ pedido.id }} - Data: {{ date }}hs</p>

          <div class="box__head-buttons">
            <select
              name="status"
              class="status"
              @change="updatePedido($event, pedido.id)"
            >
              <option
                :value="statu.tipo"
                v-for="statu in status"
                :key="statu.id"
                :selected="pedido.status == statu.tipo"
              >
                {{ statu.tipo }}
              </option>
            </select>

            <Button
              name="Finalizar"
              symbol="trash"
              @click="deletePedido(pedido.id)"
            />
          </div>
        </div>

        <!--cliente -->
        <div class="box__client">
          <p>CLIENTE: {{ pedido.nome }}</p>
          <p>TELEFONE: {{ pedido.telefone }}</p>
          <p>ENDEREÇO: {{ pedido.endereco }}</p>
          <p>BAIRRO: {{ pedido.bairro }}</p>
        </div>

        <div class="box__producto-text">PÃO: {{ pedido.pao }}</div>

        <ul class="box__producto-list">
          CARNE:
          <li v-for="(carne, index) in pedido.carnes" :key="index">
            {{ carne }} |
          </li>
        </ul>

        <ul class="box__producto-list">
          OPCIONAIS:
          <li v-for="(opcional, index) in pedido.opcionais" :key="index">
            {{ opcional }} |
          </li>
        </ul>

        <div class="box__producto-text">BATATA: {{ pedido.batata }}</div>
        <div class="box__producto-text">BEBIDA: {{ pedido.bebida }}</div>

        <ul class="box__producto-list">
          TIPO DE BEBIDA:
          <li v-for="(tipoBebida, index) in pedido.tipoBebidas" :key="index">
            {{ tipoBebida }} |
          </li>
        </ul>

        <div class="box__producto-text">SORVETE: {{ pedido.sorvete }}</div>
      </div>
    </div>

    <div v-show="message_server_error">
      <ErrorServidorContent
        message_server_error="Sistema indisponível no momento, tente novamente mais tarde."
      />
    </div>
  </AppContent>
</template>


<script>
import AppContent from "@/components/templates/AppContent";
import Message from "@/components/shared/Message";
import Button from "@/components/shared/Button";
import ErrorServidorContent from "@/components/shared/ErrorServidorContent.vue";

export default {
  components: {
    AppContent,
    Message,
    Button,
    ErrorServidorContent,
  },

  data() {
    return {
      pedidos: null,
      pedido_id: null,
      status: [],
      message_remove_wish: null,
      message_update_wish: null,
      date: new Date().toLocaleString(),

      message_server_error: null,
    };
  },
  methods: {
    async getPedidos() {
      //Resposta do banco com inserção do dados:
      try {
        const req = await fetch(
          "https://api-data-make-your-wish.herokuapp.com/pedidos"
        );
        const data = await req.json();
        this.pedidos = data;

        if (data == false) {
          this.msg_pedido = "Não há pedidos em aberto no momento.";
        }

        // Resgata os status de pedidos:
        this.getStatus();
      } catch (err) {
        this.message_server_error = true;
        console.log(`Deu erro no acesso ao servidor` + err);
      }
    },
    // Status de pedidos:
    async getStatus() {
      try {
        const req = await fetch(
          "https://api-data-make-your-wish.herokuapp.com/status"
        );
        const data = await req.json();
        this.status = data;
      } catch (err) {
        console.log(`Erro no acesso ao servidor`);
        console.log(err);
      }
    },
    //Deletar pedido:
    async deletePedido(id) {
      try {
        const req = await fetch(
          `https://api-data-make-your-wish.herokuapp.com/pedidos/${id}`,
          {
            method: "DELETE",
          }
        );

        //msg pedido removido
        const res = await req.json();
        this.message_remove_wish = `Pedido removido com sucesso.`;
        setTimeout(() => (this.message_remove_wish = ""), 3000);
        console.log(res);

        // Resgata dados atualizados no banco de dados:
        this.getPedidos();
      } catch (err) {
        console.log(`Deu erro no acesso ao servidor` + err);
      }
    },

    //Atualiza dados
    async updatePedido(event, id) {
      try {
        const option = event.target.value;
        const dataJson = JSON.stringify({ status: option });
        const req = await fetch(
          `https://api-data-make-your-wish.herokuapp.com/pedidos/${id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: dataJson,
          }
        );

        //mensagem pedido atualizado
        const res = await req.json();
        this.message_update_wish = `Pedido atualizado Nº ${res.id} com sucesso para ${res.status}.`;
        setTimeout(() => (this.message_update_wish = ""), 3000);
      } catch (err) {
        console.log(`Deu erro no acesso ao servidor` + err);
      }
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>


<style lang="scss" scoped>
.dashboard {
  font-size: 1rem;
  margin: 0 auto;
  max-width: 1000px;
  padding: 0 1rem;

  &___box {
    line-height: 2rem;

    .box__head {
      display: flex;
      align-items: center;
      justify-content: space-between;

      border-top: 0.3rem solid var(--border-color-2);
      font-weight: bolder;
      margin-top: 1rem;
      padding: 0 1rem;

      p {
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 0.1rem dashed var(--border-color-2);
        height: 2rem;
        margin: 0.5rem 0;
        width: auto;
      }

      &-buttons {
        display: flex;
        margin: 1rem 0 0.5rem 0;

        select {
          margin-right: 1rem;
          width: 8rem;
          padding: 0 0.5rem;
        }
      }
    }

    .box__client {
      font-weight: bold;
      padding: 0 1rem;
    }

    .box__producto-text {
      display: flex;
      flex-direction: row;

      border-top: 0.1rem dashed var(--border-color-3);
      padding: 0 1rem;
    }

    .box__producto-list {
      display: flex;
      flex-wrap: wrap;
      border-top: 0.1rem dashed var(--border-color-3);
      padding: 0 1rem;

      li {
        list-style: none;
        padding-left: 0.5rem;
      }
    }
  }
}

@media (max-width: 762px) {
  .dashboard {
    font-size: 0.8rem;

    &___box {
      line-height: 1.5rem;

      .box__head {
        display: block;

        p {
          width: 19rem;
        }

        &-buttons {
          p {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>