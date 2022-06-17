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
        }
    ]
}