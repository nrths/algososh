import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Buttons tests', () => {

    it('button with text', () => {
        const button = renderer.create(<Button text="foo" />).toJSON()
        expect(button).toMatchSnapshot()
    })

    it('button without text', () => {
        const button = renderer.create(<Button />).toJSON()
        expect(button).toMatchSnapshot()
    })

    it('button disabled', () => {
        const button = renderer.create(<Button disabled />).toJSON()
        expect(button).toMatchSnapshot()
    })

    it('button load', () => {
        const button = renderer.create(<Button isLoader />).toJSON()
        expect(button).toMatchSnapshot()
    })

    it('button cb works correctly', () => {
        window.alert = jest.fn()
        render(<Button text='foo' onClick={alert('test')} />)
        const button = screen.getByText('foo')
        fireEvent.click(button)
        expect(window.alert).toHaveBeenCalledWith('test')
      })
})