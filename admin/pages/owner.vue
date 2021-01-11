<template>
  <main>
    <div class="contain-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2 style="text-align: center">Add a new Owner</h2>
          <form>
            <div class="a-spacing-top-medium"></div>

            <!-- Name Text -->
            <label>Name</label>
            <input class="a-input-text" style="width: 100%" v-model="name" />
            <div class="a-spacing-top-medium"></div>

            <!-- About Text -->
            <label>about</label>
            <textarea
              placeholder="Provide information about the owner"
              style="width: 100%"
              v-model="about"
            ></textarea>
            <div class="a-spacing-top-medium"></div>

            <!-- Photo Import -->
            <label>Add Photo</label>
            <div class="a-row a-spacing-top-medium"></div>
            <label class="choosefile-buttion">
              <i class="fal fa-plus"></i>
              <input type="file" @change="onPhotoSelected" />
              <p style="margin-top: 70px">{{ photoName }}</p>
            </label>
            <!-- Button -->
            <hr />
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddOwner"
                    >Add Owner</span
                  >
                </span>
              </span>
            </div>
          </form>
          <br />
          <ul class="list-group" >
            <li class="list-group-item" v-for="owner in owners" :key="owner._id">{{ owner.name }}</li>
          </ul>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      about: "",
      photo: null,
      photoName: "",
    };
  },

  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/owners");
      console.log(response.owners)
      return {
        owners: response.owners
      }
      
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    onPhotoSelected(event) {
      this.photo = event.target.files[0];
      console.log(this.selectedFile);
      this.photoName = event.target.files[0].name;
    },

    async onAddOwner() {
      try {
        let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.photo, this.photoName);

        let result = await this.$axios.$post(
          "/api/owners",
          data
        );

        this.owners.push(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>