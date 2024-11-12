function CNPJmask(cnpj: string) {
     cnpj = cnpj.replace(/\D/g, "");
     cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
     cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
     cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
     cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
     return cnpj;
}

function PhoneMask(phone: string) {
     phone = phone.replace(/\D/g, "");
     phone = phone.replace(/^(\d{2})(\d)/, "($1) $2");
     phone = phone.replace(/(\d{4})(\d)/, "$1-$2");
     
     return phone;
}

function LimparCEP(cep: string) {
     cep = cep.replace(/\D/g, "");

     return cep;
}

export {CNPJmask, PhoneMask, LimparCEP};
