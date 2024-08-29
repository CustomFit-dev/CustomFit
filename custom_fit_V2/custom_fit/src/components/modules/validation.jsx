export const validateNom = (nombres) =>{
    if (!nombres.trim()){
        return'Los nombres son requeridos'
    }
    return '';
}

export const validateApe = (apellidos) =>{
    if (!apellidos.trim()){
        return'Los apellidos son requeridos'
    }
    return '';
}

export const validatenom_u = (nombre_usuario) =>{
    if (!nombre_usuario.trim()){
        return'El nombre de usuario es requerido'
    }
    return '';
}

export const validatecel = (celular) =>{
    const celularP = /^[0-9]{10}$/;
    if (!celular.trim()){
        return'El celular es requerido';
    }else if(!celularP.test(celular)){
        return 'EL numero celular no es valido';
    }
    return '';
}

export const validateCode = (cod) =>{
    const codP = /^\d{1,10}$/;
    if (!cod.trim()){
        return 'Porfavor, ingrese el codigo';
    }else if (!codP.test(cod)){
        return 'El codigo no es valido';
    }
    return '';
}

export const validateEmail = (correo_electronico) =>{
    const emailP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!correo_electronico.trim()){
        return'El correo electronico es requerido';
    }else if(!emailP.test(correo_electronico)){
        return 'EL correo no es valido';
    }
    return '';
}

export const validateEmailconf = (correoElectronico, conf_correo_electronico) =>{
    if (!conf_correo_electronico.trim()){
        return'La confirmacion del correo electronico es requerido';
    } else if (correoElectronico !== conf_correo_electronico){
        return'Los correos no coninciden';
    }
    return '';

    
}