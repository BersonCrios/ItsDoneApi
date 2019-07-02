const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            bd_string: 'mongodb+srv://usuario_admin:@guilherme123147369789@cluster0-xmw0f.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'nGtjCXd0h7YtcCprHfbZlJKmh3CvOJEh',
            jwt_expires_in: '1d'
        }

        case 'hml':
        return {    
            bd_string: 'mongodb+srv://usuario_admin:@guilherme123147369789@cluster0-xmw0f.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'nGtjCXd0h7YtcCprHfbZlJKmh3CvOJEh',
            jwt_expires_in: '1d'
        }

        case 'prod':
        return {
            bd_string: 'mongodb+srv://usuario_admin:@guilherme123147369789@cluster0-xmw0f.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'peN4s1uW3MdMHaQMtZ1JIgYhHnN3R5kUM6jGHjXAektSZOD0dSJJrytKODJGWRx7XeuKblYKnbpVe0KTDx3exB0fbHPdZFKOeZDegiL4GpAHYZISSfKsAu70bNGSkH8bft04qj6oOzhY4e9btpNrgWEATvH8vIWdH7Ln7xjxZYNvtqtIgvljPRCrFNgfcupsjip0qr0Tsc71MTyOtR5k8YPyuhWpBjciycQmD1dQbpsgbJBFcY3wsKckyKgYb7KU',
            jwt_expires_in: '1d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();