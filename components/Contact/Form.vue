<template>
    <div class="flex flex-col gap-3 justify-center w-96">
        <div class="control">
            <label for="saludation" class="label">Saludation:</label>
            <div class="select w-full cursor-pointer">
                <select id="salutation" v-model.lazy="form.saludation" name="salutation" class="input w-full" @blur="touched.saludation = true" @input="touched.saludation = false">
                    <option value="mr">Mr.</option>
                    <option value="ms">Ms.</option>
                </select>
            </div>
            <p class="text-error text-sm mt-1">{{ errors.saludation }}</p>
        </div>
        <div class="control">
            <label for="name" class="label">Name:</label>
            <input id="name" v-model.lazy="form.name" name="name" type="text" class="input" @blur="touched.name = true" @input="touched.name = false">
            <p class="text-error text-sm mt-1">{{ errors.name }}</p>
        </div>
        <div class="control">
            <label for="" class="label">Email:</label>
            <input id="name" v-model.lazy="form.email" name="name" type="email" class="input" @blur="touched.email = true" @input="touched.email = false">
            <p class="text-error text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div class="control">
            <label for="subject" class="label">Subject:</label>
            <input id="subject" v-model.lazy="form.subject" name="subject" type="text" class="input" @blur="touched.subject = true" @input="touched.subject = false">
            <p class="text-error text-sm mt-1">{{ errors.subject }}</p>
        </div>
        <div class="control">
            <label for="message" class="label">Message:</label>
            <textarea id="message" v-model.lazy="form.message" name="message" class="input" @blur="touched.message = true" @input="touched.message = false" />
            <p class="text-error text-sm mt-1">{{ errors.message }}</p>
        </div>
        <div class="control">
            <div class="checkbox flex flex-row gap-2">
                <input id="accept" v-model.lazy="form.accepted" name="accept" type="checkbox" @blur="touched.accepted = true">
                <label for="accept" class="label cursor-pointer">I accept the terms and conditions of use</label>
            </div>
            <p class="text-error text-sm mt-1">{{ errors.accepted }}</p>
        </div>
        <button v-if="!loading && resultSubmit === ''" class="btn-primary mt-5 inline" @click.prevent="submitContact">
            Send Message
        </button>
        <div v-else-if="loading" class="mx-auto" >
            <UtilsLoader :classes-spin="'fill-green-400 dark:fill-green-500 size-8 text-white mx-auto mb-8'"/>
        </div>
        <p class="text-accent font-bold text-center text-sm">
            {{ resultSubmit }}
        </p>
    </div>
</template>

<script lang="ts" setup>

    const form = reactive({
        email: "",
        saludation: "",
        name: "",
        subject: "",
        message: "",
        accepted: false,
    });

    const touched = reactive({
        email: false,
        saludation: false,
        name: false,
        subject: false,
        message: false,
        accepted: false,
    })

    const errors = reactive({
        email: computed(() => {
            if (!touched.email) return ""
            if (form.email.trim() === "") return "Email is required."
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) return "The email is not valid"
            return ""
        }),
        saludation: computed(() => {
            if (!touched.saludation) return ""
            if (form.saludation === "") return "Saludation is required."
            return ""
        }),
        name: computed(() => {
            if (!touched.name) return ""
            if (form.name.trim() === "") return "Name is required."
            if (form.name.trim().length < 2) return "The name couldn't be less than 2 character"
            if (form.subject.trim().length > 100) return "The name couldn't be more than 99 character"
            if (!validateInput(form.name.trim())) return "The name is not valid"
            if (sanitizeHtml(form.name.trim())) return "Remove html tags and Javascript code"
            return ""
        }),
        subject: computed(() => {
            if (!touched.subject) return ""
            if (form.subject.trim() === "") return "Subject is required."
            if (form.subject.trim().length < 2) return "The subject couldn't be less than 2 character"
            if (form.subject.trim().length > 100) return "The subject couldn't be more than 99 character"
            if (!validateInput(form.subject.trim())) return "The subject is not valid"
            if (sanitizeHtml(form.subject.trim())) return "Remove html tags and Javascript code"
            return ""
        }),
        message: computed(() => {
            if (!touched.subject) return ""
            if (form.message.trim() === "") return "Message is required."
            if (form.message.trim().length < 1) return "The message couldn't be less than 2 character"
            if (sanitizeHtml(form.message.trim())) return "Remove html tags and Javascript code"
            return ""
        }),
        accepted: computed(() => {
            if (!touched.accepted) return ""
            if (!form.accepted) return "You need to accept terms and conditions"
            return ""
        }),
    });

    const loading = ref(false);
    const resultSubmit = ref("");

    const validateInput = (text): boolean => {
        return /^[A-ZÁÉÍÓÚÑa-záéíóúñ' -]+$/.test(text)
    }

    const sanitizeHtml = (text): boolean => {
        return /(<.*?>|script|on\w+\s*=|javascript:|data:)/gi.test(text)
    }

    const removedTouched = () => {
        touched.email = true;
        touched.saludation = true;
        touched.name = true;
        touched.subject = true;
        touched.message = true;
        touched.accepted = true;
    }

    const validatedForm = (): boolean => {
        return errors.email === "" && errors.saludation === "" &&
        errors.name === "" && errors.subject === "" &&
        errors.message === "" && errors.accepted === "";
    }

    const submitContact = () => {
        removedTouched();
        if(validatedForm()) {
            loading.value = true;
            setTimeout(() => {
                loading.value = false;
                resultSubmit.value = "The message was sent"
            }, 2000);
        }
    }
</script>