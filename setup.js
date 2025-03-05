/**
 * This is the entry file for the FoundryVTT module to add the Remasters RPG to Custom System Builder
 * @author Yume Fernandes
 */


/** Hook to register settings */

Hooks.once('init', function(){
    console.log('Remasters CSB | Initializing module');
});

Hooks.once('ready',async function(){
    CONFIG.statusEffects = [
        {
            id: 'atordoado',
            name: 'Atordoado',
            icon: 'modules/csb-remasters/assets/icons/atordoado.png'
        },
        {
            id: 'desprotegido-f',
            name: 'Desprotegido (Físico)',
            icon: 'modules/csb-remasters/assets/icons/desprotegido.png'
        },
        {
            id: 'desprotegido-e',
            name: 'Desprotegido (Elemental)',
            icon: 'modules/csb-remasters/assets/icons/desprotegido.png'
        },
        {
            id: 'desprotegido-m',
            name: 'Desprotegido (Mental)',
            icon: 'modules/csb-remasters/assets/icons/desprotegido.png'
        },
        {
            id: 'desprotegido-d',
            name: 'Desprotegido (Deteriorante)',
            icon: 'modules/csb-remasters/assets/icons/desprotegido.png'
        },
        {
            id: 'dormindo',
            name: 'Dormindo',
            icon: 'modules/csb-remasters/assets/icons/dormindo.png'
        },
        {
            id: 'efeito-continuo-t',
            name: 'Efeito Contínuo (Sem Tipo)',
            icon: 'modules/csb-remasters/assets/icons/duration.png'
        },
        {
            id: 'efeito-continuo-f',
            name: 'Efeito Contínuo (Físico)',
            icon: 'modules/csb-remasters/assets/icons/continuo-fisico.png'
        },
        {
            id: 'efeito-continuo-e',
            name: 'Efeito Contínuo (Elemental)',
            icon: 'modules/csb-remasters/assets/icons/continuo-elemental.png'
        },
        {
            id: 'efeito-continuo-m',
            name: 'Efeito Contínuo (Mental)',
            icon: 'modules/csb-remasters/assets/icons/continuo-mental.png'
        },
        {
            id: 'efeito-continuo-d',
            name: 'Efeito Contínuo (Deteriorante)',
            icon: 'modules/csb-remasters/assets/icons/continuo-deteriorante.png'
        },
        {
            id: 'enfraquecido',
            name: 'Enfraquecido',
            icon: 'modules/csb-remasters/assets/icons/enfraquecido.png'
        },
        {
            id: 'lentidao',
            name: 'Lentidão',
            icon: 'modules/csb-remasters/assets/icons/lento.png'
        },
        {
            id: 'marcado',
            name: 'Marcado',
            icon: 'modules/csb-remasters/assets/icons/marcado.png'
        },
        {
            id: 'medo',
            name: 'Medo',
            icon: 'modules/csb-remasters/assets/icons/medo.png'
        },
        {
            id: 'cego',
            name: 'Cego',
            icon: 'modules/csb-remasters/assets/icons/cego.png'
        },
        {
            id: 'surdo',
            name: 'Surdo',
            icon: 'modules/csb-remasters/assets/icons/surdo.png'
        },
        {
            id: 'confusao',
            name: 'Confusão',
            icon: 'modules/csb-remasters/assets/icons/confuso.png'
        },
        {
            id: 'derrubado',
            name: 'Derrubado',
            icon: 'modules/csb-remasters/assets/icons/derrubado.png'
        },
        {
            id: 'desprevinido',
            name: 'Desprevinido',
            icon: 'modules/csb-remasters/assets/icons/desprevinido.png'
        },
        {
            id: 'drenado',
            name: 'Drenado',
            icon: 'modules/csb-remasters/assets/icons/drenado.png'
        },
        {
            id: 'invisivel',
            name: 'Invisível',
            icon: 'modules/csb-remasters/assets/icons/invisivel.png'
        },
        {
            id: 'indetecado',
            name: 'Indetectado',
            icon: 'modules/csb-remasters/assets/icons/indetectado.png'
        },
        {
            id: 'escondido',
            name: 'Escondido',
            icon: 'modules/csb-remasters/assets/icons/escondido.png'
        },
        {
            id: 'preso',
            name: 'Preso',
            icon: 'modules/csb-remasters/assets/icons/preso.png'
        },
        {
            id: 'incapacitado',
            name: 'Incapacitado',
            icon: 'modules/csb-remasters/assets/icons/incapacitado.png'
        },
        {
            id: 'sobrecarregado',
            name: 'Sobrecarregado',
            icon: 'modules/csb-remasters/assets/icons/sobrecarregado.png'
        },
        {
            id: 'fadigado',
            name: 'Fadigado',
            icon: 'modules/csb-remasters/assets/icons/fadigado.png'
        }
    ];
});