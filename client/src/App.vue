<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                dark color="green darken-2"
                flat
              >
                <v-toolbar-title>IoT Sensors</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Temperature"
                    v-model="temperature"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="Humidity"
                    v-model="humidity"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="Pressure"
                    v-model="pressure"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="status"
                    solo
                    readonly
                  ></v-text-field>                  
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                  dark color="green darken-3"
                  @click="InitDev"
                >Init Dev
                </v-btn>
                <v-btn
                  dark color="green darken-3"
                  @click="SendData"
                >Send Data
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import IoTApi from '@/services/IoT-API-Client'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      pressure: null,
      humidity: null,
      temperature: null,
      status: 'Status: not init'
    }),

    methods: {
    async InitDev () {
      console.log('InitDev')
      try {
        let ret = await IoTApi.init()
        console.log('InitDev: ', ret.data.status)
        this.status = ret.data.status
        } catch (error) {
          /*
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
        */
      }
    }, // init
  
    async SendData () {
      console.log('SendData')
      try {
        let params = {
          temperature: this.temperature,
          pressure: this.pressure,
          humidity: this.humidity
        }
        console.log('SendData: ', params)
        let ret = await IoTApi.publish(params)
        console.log('SendData: ', ret.data.status)
        this.status = ret.data.status

        } catch (error) {
          /*
        if ((error.response !== undefined) && (error.response.data.error !== undefined)) {
          this.BlockchainState = error.response.data.error
        } else {
          this.BlockchainState = 'No connection to the Blockchain server'
        }
        */
      }
     } // send data
    }
  }
</script>