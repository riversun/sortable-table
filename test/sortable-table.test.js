import SortableTable from '../src/sortable-table';
import EventEmitter from '@riversun/event-emitter';
import { createHTML, data, dataIncludingSame } from './test-common';

/**
 * remember asc and desc :)
 *
 * asc ▲
 * 1
 * 2
 * 3
 *
 * desc ▼
 * 3
 * 2
 * 1
 */
describe('SortableTable', () => {
  describe('resetData()', () => {
    test('reset', () => {
      createHTML();
      const st = new SortableTable();
      st.setTable(document.querySelector('#my-table'));
      st.setData(data);
      st.sort('name', 'asc');
      const sortedData = st.getData();
      const ids = sortedData.map(x => x.id);
      expect(ids)
        .toStrictEqual([1, 0, 2, 3]);

      //do reset
      st.resetData();
      const sortedData2 = st.getData();
      const ids2 = sortedData2.map(x => x.id);
      expect(ids2)
        .toStrictEqual([0, 1, 2, 3]);

    });


    test('Check num of columnConfs children is same as columns after reset', () => {
      createHTML();
      const tableEle = document.querySelector('#my-table');
      const st = new SortableTable();
      st.setTable(tableEle);
      st.setData(data);
      st.sort('name', 'asc');
      expect(data.length)
        .toBe(st._getColumnConfAll().size);

      st.resetData();
      expect(data.length)
        .toBe(st._getColumnConfAll().size);
    });

    test('simulate click column', () => {
      createHTML();
      const tableEle = document.querySelector('#my-table');
      const st = new SortableTable();
      st.setTable(tableEle);
      st.setData(data);
      const clickedColId = 'price';
      const clickedColEle = tableEle.querySelector(`[data-id="${clickedColId}"]`);
      const e = {
        target: clickedColEle
      };

      //simulate 'click' 1-1st
      {
        st._onSortClick(e);
        const sortedData = st.getData();
        const ids = sortedData.map(x => x.id);
        expect(ids)
          .toStrictEqual([1, 3, 2, 0]);
      }
      //simulate 'click' 1-2nd
      {
        st._onSortClick(e);
        const sortedData = st.getData();
        const ids = sortedData.map(x => x.id);
        expect(ids)
          .toStrictEqual([0, 2, 3, 1]);
      }

      //simulate 'click' 2-1st
      {
        st._onSortClick(e);
        const sortedData = st.getData();
        const ids = sortedData.map(x => x.id);
        expect(ids)
          .toStrictEqual([1, 3, 2, 0]);
      }
      //simulate 'click' 2-2nd
      {
        st._onSortClick(e);
        const sortedData = st.getData();
        const ids = sortedData.map(x => x.id);
        expect(ids)
          .toStrictEqual([0, 2, 3, 1]);
      }
      //simulate 'click' 2-3rd
      {
        st._onSortClick(e);
        const sortedData = st.getData();
        const ids = sortedData.map(x => x.id);
        expect(ids)
          .toStrictEqual([1, 3, 2, 0]);
      }
    });
  });
  describe('getData()', () => {

    test('Make sure the library does not change the original data', () => {
      createHTML();
      const tableEle = document.querySelector('#my-table');
      const st = new SortableTable();
      st.setTable(tableEle);
      st.setData(data);
      st.sort('name', 'asc');
      const sortedData = st.getData();
      const sortedDataOrder = sortedData.map(x => x.id);
      expect(sortedDataOrder)
        .toStrictEqual([1, 0, 2, 3]);

      const originalDataOrder = data.map(x => x.id);
      expect(originalDataOrder)
        .toStrictEqual([0, 1, 2, 3]);
    });
  });

  describe('events()', () => {

    test('EventEmitter instance exists', () => {
      createHTML();

      const st = new SortableTable();
      expect(st.events())
        .toBeInstanceOf(EventEmitter);

    });
  });

  describe('_getInversedSortDir()', () => {

    test('check inversed sort dir', () => {
      createHTML();

      const st = new SortableTable();
      expect(st._getInversedSortDir('asc'))
        .toBe('desc');
      expect(st._getInversedSortDir('desc'))
        .toBe('asc');
    });
  });

  describe('_onSortClick()', () => {

    test('simulate click column', () => {
      createHTML();
      const tableEle = document.querySelector('#my-table');
      const st = new SortableTable();
      st.setTable(tableEle);
      st.setData(data);
      const clickedColId = 'price';
      const clickedColEle = tableEle.querySelector(`[data-id="${clickedColId}"]`);
      const e = {
        target: clickedColEle
      };
      //simulate 'click'
      st._onSortClick(e);
      const sortedData = st.getData();
      const ids = sortedData.map(x => x.id);
      expect(ids)
        .toStrictEqual([1, 3, 2, 0]);
    });
  });


  describe('sort()', () => {
    test('sortBy string with asc', () => {
      createHTML();
      const st = new SortableTable();
      st.setTable(document.querySelector('#my-table'));
      st.setData(data);

      {
        //simulate first click on name
        st.sort('name');
        const colConf = st._getColumnConf('name');
        expect(colConf.sortDir)
          .toBe('asc');
      }

      {
        //simulate second click on name
        st.sort('name');
        const colConf = st._getColumnConf('name');
        expect(colConf.sortDir)
          .toBe('desc');
      }

      {
        //simulate clicking change other column from name
        st.sort('price');
        const colConf = st._getColumnConf('price');
        expect(colConf.sortDir)
          .toBe('asc');
      }

      {
        //simulate clicking 'name' again
        st.sort('name');
        const colConf = st._getColumnConf('name');
        //remember sort condition of 'desc'
        expect(colConf.sortDir)
          .toBe('desc');
      }

    });

    //force dir
    test('force sortBy string with asc', () => {
      createHTML();
      const st = new SortableTable();
      st.setTable(document.querySelector('#my-table'));
      st.setData(data);
      st.sort('name', 'asc');
      const sortedData = st.getData();
      const ids = sortedData.map(x => x.id);
      expect(ids)
        .toStrictEqual([1, 0, 2, 3]);
    });

    test('force sortBy string with desc', () => {
      createHTML();
      const st = new SortableTable();
      st.setTable(document.querySelector('#my-table'));
      st.setData(data);
      st.sort('name', 'desc');
      const sortedData = st.getData();
      const ids = sortedData.map(x => x.id);
      expect(ids)
        .toStrictEqual([3, 2, 0, 1]);
    });

    test('force sortBy number with asc', () => {
      createHTML();
      const st = new SortableTable();
      st.setTable(document.querySelector('#my-table'));
      st.setData(data);
      st.sort('price', 'asc');
      const sortedData = st.getData();
      const ids = sortedData.map(x => x.id);
      expect(ids)
        .toStrictEqual([1, 3, 2, 0]);
    });

    test('force sortBy number with desc', () => {
      createHTML();
      const st = new SortableTable();
      st.setTable(document.querySelector('#my-table'));
      st.setData(data);
      st.sort('price', 'desc');
      const sortedData = st.getData();
      const ids = sortedData.map(x => x.id);
      expect(ids)
        .toStrictEqual([0, 2, 3, 1]);
    });


    test('sort including same', () => {
      createHTML();
      const st = new SortableTable();
      st.setTable(document.querySelector('#my-table'));
      st.setData(dataIncludingSame);
      {
        st.sort('price', 'desc');
        const sortedData = st.getData();
        const ids = sortedData.map(x => x.id);
        expect(ids)
          .toStrictEqual([0, 1]);
      }
      {
        st.sort('price', 'asc');
        const sortedData = st.getData();
        const ids = sortedData.map(x => x.id);
        expect(ids)
          .toStrictEqual([0, 1]);
      }

    });


  });
});
