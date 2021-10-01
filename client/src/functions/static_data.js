export const getNomeTipo = (value)=>{
    var data = ['Administrador','Usuario'];
    return data[value -1];
};
export const getColorTipo = (value)=>{
    var data = ['primary','secondary'];
    return data[value -1];
};