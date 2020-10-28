import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import AdminLogin from '../AdminLogin';
import Login from '../Login';
Enzyme.configure({ adapter: new Adapter() })
const localStorageMock = (() => {
    let store = {};

    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        removeItem(key) {
            delete store[key];
        },
        clear() {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock
});

describe('admin login', () => {
    it('successful login of admin', () => {
        let wrapper;
        wrapper = shallow(<AdminLogin />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'nolancongecr@gmail.com' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'password' } });
        wrapper.find("select").simulate('change', { target: { name: 'Admin', value: 'Admin' } });
        wrapper.find('button').simulate('click');
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        Storage.prototype.setItem = jest.fn(() => 'token');
    })
})

describe('student login', () => {
    it('successful login of student', () => {
        let wrapper;
        wrapper = shallow(<Login />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'nolancongecr@gmail.com' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: 'password' } });
        wrapper.find("select").simulate('change', { target: { name: 'Student', value: 'Student' } });
        wrapper.find('button').simulate('click');
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        Storage.prototype.setItem = jest.fn(() => 'token');
    })
});

