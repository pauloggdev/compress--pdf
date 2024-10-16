<template>
<div id="app">
    <input type="file" />
    <span v-if="errors.file" style="color:red">{{ errors.file }}</span>
    <br><br>
    <button @click.prevent="compressPdf" :disabled="isLoading">
        <span v-if="isLoading" class="spinner"></span>
        <span v-if="isLoading"> Carregando...</span>
        <span v-else>Comprimir PDF</span>
    </button>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            file: '',
            isLoading: false,
            errors:{}

        }
    },
    methods: {
        async compressPdf() {
            this.isLoading = true;
            const formData = new FormData();
            formData.append("file", this.file);
            try {
                const responseData = await axios.post(`http://localhost:3000/compressPDF`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (responseData.status == 200) {
                    this.isLoading = false;

                }
            } catch (error) {
                this.isLoading = false;

            }
        }
    }

}
</script>

<style scoped>
button {
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Estilos para o spinner */
.spinner {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top: 2px solid #000;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: inline-block;
    animation: spin 0.6s linear infinite;
    margin-right: 5px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
