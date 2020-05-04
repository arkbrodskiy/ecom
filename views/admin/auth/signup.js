const layout = require('../layout');

const getError = (errors, field) => {
    try {
        return errors.mapped()[field].msg
    } catch (err) {
        return '';
    }
}

module.exports = ({ req, errors}) => {
    return layout({
        content: `
            <div>
                Your id is: ${req.session.userId}
                <form method='POST'>
                    <input name='email' placeholder='email' />
                    ${getError(errors, 'email')}
                    <input name='password' placeholder='password' />
                    ${getError(errors, 'password')}
                    <input name='passwordConfirmation' placeholder='password confirmation' />
                    ${getError(errors, 'passwordConfirmation')}
                    <button>Sign Up</button>
                </form>
            </div>
        `
    });
}

// <!--  --> 
// <!-- ${console.log(getError(errors, 'passwordConfirmation'))} -->