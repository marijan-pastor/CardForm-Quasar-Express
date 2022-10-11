<template>
  <q-page class="flex flex-center">
    <q-form class="column q-pa-md shadow-2">

      <q-input
        name="cardNum"
        placeholder="Card Number"
        type="number"
        v-model="cardNum"
        />

      <q-input
        name="date"
        placeholder="Expiry date"
        filled
        v-model="date"
        mask="##/##"
        >

          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
      </q-input>

      <q-input
        name="cvv"
        placeholder="CVV"
        type="number"
        v-model="cvv"
        />

      <q-btn @click="fetchData()">
        Submit
      </q-btn>
    </q-form>
  </q-page>
</template>


<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'


export default defineComponent({
  name: 'IndexPage',
  setup () {
    const $q = useQuasar()
    const cardNum = ref(null)
    const date = ref(null)
    const cvv = ref(null)

    function fetchData() {
      api.post('/', {
          cardNumber: cardNum.value,
          expireDate: date.value,
          token: cvv.value
      })
      .then((response) => {
        $q.notify({
          message: 'Valid entry',
          color: 'green'
        })
      })
      .catch((err) => {
        $q.notify({
          message: 'Not valid entry!',
          color: 'red'
        })
      })
    }
    return {
      cardNum,
      date,
      cvv,
      fetchData
    }
  },
})

</script>
