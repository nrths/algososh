import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('circle tests', () => {

    it('circle without character', () => {
        const circle = renderer.create(<Circle />).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with character', () => {
        const circle = renderer.create(<Circle letter='l' />).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with head', () => {
        const circle = renderer.create(<Circle head='h'/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with react-component in head', () => {
        const circle = renderer.create(<Circle head={<Circle letter='h' />} />).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with tail', () => {
        const circle = renderer.create(<Circle head='t'/>).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with react-component in tail', () => {
        const circle = renderer.create(<Circle head={<Circle letter='t' />} />).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with index', () => {
        const circle = renderer.create(<Circle index={1} />).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with "isSmall" component-prop', () => {
        const circle = renderer.create(<Circle isSmall />).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with state = default', () => {
        const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with state = changing', () => {
        const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()
        expect(circle).toMatchSnapshot()
    })

    it('circle with state = modified', () => {
        const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()
        expect(circle).toMatchSnapshot()
    })

})