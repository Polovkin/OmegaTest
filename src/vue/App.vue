<template lang="pug">

  #app
    h1.registration__title Welcome to OMG
    form#form.registration__form(@submit.prevent="submitHandler")
      .registration__wrap
        .registration__item.registration__item--wraped
          label.registration__item-label(for='name')
            input#name.registration__item-input(
              @focus="$v.name.$touch()"
              placeholder='First Name',
              type='text',
              name="name",
              form="form",
              v-model.trim="name",
              :class="{'invalid': ($v.name.$dirty && !$v.name.required)}"
            )
            span.error(v-if="($v.name.$dirty && !$v.name.required)")
              | The Name field must not be empty
            span.error(v-else-if="($v.name.$dirty && !$v.name.minLength)")
              | Name must be at least {{$v.name.$params.minLength.min}} characters.
            span.error(v-else-if="($v.name.$dirty && !$v.name.maxLength)")
              | Name should be no more than {{$v.name.$params.maxLength.min}} characters.

        .registration__item.registration__item--wraped
          label.registration__item-label(for='name')
            input#surname.registration__item-input(
              @focus="$v.surname.$touch()"
              placeholder='Last Name',
              type='text',
              name="surname",
              form="form",
              v-model.trim="surname",
              :class="{'invalid': ($v.surname.$dirty && !$v.surname.required)}"
            )
            span.error(v-if="($v.surname.$dirty && !$v.surname.required)")
              | The Name field must not be empty
            span.error(v-else-if="($v.surname.$dirty && !$v.surname.minLength)")
              | Name must be at least {{$v.surname.$params.minLength.min}} characters.
            span.error(v-else-if="($v.surname.$dirty && !$v.surname.maxLength)")
              | Name should be no more than {{$v.surname.$params.maxLength.min}} characters.
      .registration__item
        label.registration__item-label(for='phone')
          input#phone.registration__item-input(
            @focus="$v.phone.$touch()"
            placeholder='Phone',
            v-mask="mask"
            type='tel',
            name="phone",
            form="form",
            v-model.trim="phone",
            :class="{'invalid': (($v.phone.$dirty && !$v.phone.required) || ($v.phone.$dirty && !$v.phone.isPhone))}"
          )
          span.error(v-if="($v.phone.$dirty && !$v.phone.required)")
            | The Name field must not be empty
          span.error(v-else-if="($v.phone.$dirty && !$v.phone.isPhone)")
            | Please enter a valid phone number


      .registration__item
        label.registration__item-label(for='email')
          input.registration__item-input#email(
            @focus="$v.email.$touch()"
            placeholder='Email',
            type='text',
            name="email",
            form="form",
            v-model.trim="email",
            :class="{'invalid': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
          )
          span.error(v-if="($v.email.$dirty && !$v.email.required)")
            | The Email field must not be empty
          span.error(v-else-if="($v.email.$dirty && !$v.email.email)")
            | Please enter a valid email address
          span.error(v-else-if="($v.email.$dirty && !$v.email.minLength)")
            | Email must be at least {{$v.email.$params.minLength.min}} characters.
          span.error(v-else-if="($v.email.$dirty && !$v.email.maxLength)")
            | Email should be no more than {{$v.email.$params.maxLength.min}} characters.


      button#submit.registration__submit(:class="{'disabled' : valid}" type='submit')
        | Sing up now

</template>

<script>
import {email, required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: 'App',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      phone: '',
      mask: ['+44 (', /\d/, /\d/, /\d/, /\d/, ') ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
      submitStatus: false
    }
  },
  validations: {
    email: {email, required, minLength: minLength(2), maxLength: maxLength(30)},
    name: {required, minLength: minLength(2), maxLength: maxLength(20)},
    surname: {required, minLength: minLength(2), maxLength: maxLength(20)},
    phone: {
      required,
      isPhone(phone) {
        const regex = /^[\+]{0,1}44([0-9]{10})$/;
        return regex.test(phone.replace(/\s/g, '').replace(/[\])}[{(]/g, ''));
      }
    },
  },
  computed: {
    valid() {
      return this.$v.$invalid
    },
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return
      }
      alert(`name: ${this.name}, surname: ${this.surname}, email: ${this.email}, phone: ${this.phone}`)

    }
  },
};

</script>

<style lang="scss">

</style>
