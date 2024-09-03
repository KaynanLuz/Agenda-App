import { toast } from "react-toastify"

export function validateForm({ nome, idade, telefone }) {
    if (nome === '' || idade === '' || telefone === '') {
        toast.warn("Os campos Nome, Idade e Telefone são obrigatórios!");
        return false;

    }
    return true;
}

export function maskPhone(telefone) {
    let input = telefone.target;
    let numberMask = input.value;

    // Capturar a posição do cursor antes da mudança
    let cursorPosition = input.selectionStart;

    // Remover todos os caracteres não numéricos
    let unmaskedValue = numberMask.replace(/\D/g, "");

    // Aplicar a máscara com base no comprimento do número
    if (unmaskedValue.length > 10) {
        numberMask = unmaskedValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (unmaskedValue.length > 6) {
        numberMask = unmaskedValue.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (unmaskedValue.length > 2) {
        numberMask = unmaskedValue.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
        numberMask = unmaskedValue.replace(/^(\d*)/, "$1");
    }

    // Definir o valor formatado no campo de entrada
    input.value = numberMask;

    // Corrigir a posição do cursor após a formatação
    if (cursorPosition !== null) {
        // Calcula a nova posição do cursor ajustando para a máscara
        let maskedCursorPosition = cursorPosition + (numberMask.length - unmaskedValue.length);
        input.setSelectionRange(maskedCursorPosition, maskedCursorPosition);
    }
}

export function maskAge(age) {
    let ageInput = age.target;
    let ageValue = ageInput.value;

    let formattedAge = ageValue.replace(/\D/g, "");

    ageInput.value = formattedAge;
}

export function maskDateBirth(dateBirth) {
    let dateBirthInput = dateBirth.target; // Obter o campo de entrada
    let dateBirthValue = dateBirthInput.value; // Valor atual do campo
    
    // Remover todos os caracteres que não são números
    let formattedDateBirth = dateBirthValue.replace(/\D/g, "");

    // Aplicar formatação DD/MM/AAAA
    if (formattedDateBirth.length > 4) {
        // Formato DD/MM/AAAA para entradas com mais de 4 dígitos
        formattedDateBirth = formattedDateBirth.replace(/^(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    } else if (formattedDateBirth.length > 2) {
        // Formato DD/MM para entradas com mais de 2 dígitos
        formattedDateBirth = formattedDateBirth.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
    }

    // Atualizar o valor do campo de entrada com o valor formatado
    dateBirthInput.value = formattedDateBirth;
}

export function capitalizedWords(event) {
    let inputWord = event.target;
    let word = inputWord.value;

    // Dividir o nome em palavras, capitalizar a primeira letra de cada palavra e juntar novamente
    let formattedWord = word
        .split(' ') // Divide o nome completo em palavras
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza a primeira letra e coloca as restantes em minúsculo
        .join(' '); // Junta as palavras novamente com espaço

    // Atualiza o valor do campo de entrada
    inputWord.value = formattedWord;
}
