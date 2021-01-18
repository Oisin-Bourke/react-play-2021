var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    useState = _React.useState;


function SimpleForm() {
    var _useState = useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        firstName = _useState2[0],
        setFirstName = _useState2[1];

    var _useState3 = useState(''),
        _useState4 = _slicedToArray(_useState3, 2),
        lastName = _useState4[0],
        setLastName = _useState4[1];

    function handleChange(event) {
        var target = event.target;
        switch (target.name) {
            case 'firstName':
                setFirstName(event.target.value);
                break;
            case 'lastName':
                setLastName(event.target.value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(event) {
        alert('Submitting name: ' + firstName + ' ' + lastName);
        event.preventDefault();
    }

    return React.createElement(
        'div',
        null,
        React.createElement(
            'form',
            { onSubmit: handleSubmit },
            React.createElement(
                'label',
                null,
                'First Name:',
                React.createElement('input', { type: 'text', name: 'firstName', value: firstName, onChange: handleChange })
            ),
            React.createElement(
                'label',
                null,
                'Last Name:',
                React.createElement('input', { type: 'text', name: 'lastName', value: lastName, onChange: handleChange })
            ),
            React.createElement('input', { type: 'submit', value: 'Submit' })
        )
    );
}

var simpleForm = document.querySelector('#simple_form');
ReactDOM.render(React.createElement(SimpleForm, null), simpleForm);