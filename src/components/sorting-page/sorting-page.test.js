import { bubbleSort, selectionSort } from "../../utils/sorting";

describe('bubble-algorithm tests', () => {

    it('bubble, if the array is empty', async () => {
        const sorting = await bubbleSort([], 'asc')
        expect(sorting).toEqual([])
    })

    it('bubble, if the array has one item', async () => {
        const sorting = await bubbleSort([7], 'asc')
        expect(sorting).toEqual([7])
    })

    it('bubble-asc, if there are multiple elements in the array', async () => {
        const sorting = await bubbleSort([7, 5, 9], 'asc')
        expect(sorting).toEqual([5, 7, 9])
    })

    it('bubble-desc, if there are multiple elements in the array', async () => {
        const sorting = await bubbleSort([9, 5, 7], 'desc')
        expect(sorting).toEqual([9, 7, 5])
    })
})

describe('selection-algorithm tests', () => {

    it('selection, if the array is empty', async () => {
        const sorting = await selectionSort([], 'asc')
        expect(sorting).toEqual([])
    })

    it('selection, if the array has one item', async () => {
        const sorting = await selectionSort([7], 'asc')
        expect(sorting).toEqual([7])
    })

    it('selection-asc, if there are multiple elements in the array', async () => {
        const sorting = await selectionSort([5, 9, 7], 'asc')
        expect(sorting).toEqual([5, 7, 9])
    })

    it('selection-desc, if there are multiple elements in the array', async () => {
        const sorting = await selectionSort([9, 5, 7], 'desc')
        expect(sorting).toEqual([9, 7, 5])
    })
})