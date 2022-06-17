export const MENU_OPTIONS_BY_ROLE = {
    'usuario': [
        {
            name: 'Ofertas',
            apiUrl: '/buscarEmpleos',
            url: '/ofertas',
        },
        {
            name: 'Mis Aplicaciones',
            apiUrl: '/misAplicaciones',
            url: '/mis-aplicaciones',
        }, {
            name: 'Perfil',
            url: '/perfil',
        }],
    'empresa': [
        {
            name: 'Mis Empleos',
            apiUrl: '/misEmpleos',
            url: '/mis-empleos',
        },
        {
            name: 'Usuarios',
            apiUrl: '/buscarUsuarios',
            url: '/buscar-usuarios',
        }, {
            name: 'Mi Empresa',
            url: '/perfil',
        }
    ]
}