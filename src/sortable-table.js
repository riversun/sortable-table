import EventEmitter from '@riversun/event-emitter';
import ListenerManager from './listener-manager';

/**
 * This library makes tables sortable.<br>
 *  - Make the table sortable<br>
 *  - Wroks with plain HTML, Bootstrap, Vue, React and etc.<br>
 *  - No external library required, works as a standalone, no dependency.<br>
 *  - A small size library , 13KB including images.<br>
 *
 * MIT License
 * @class SortableTable
 * @author Tom Misawa (riversun.org@gmail.com,https://github.com/riversun)
 */
export default class SortableTable {
  constructor() {
    this.tableEle = null;// "table" DOM element
    this.colConfs = null;// Map() contains configuration of columns
    this.srcRows = null;// original data
    this.rows = null;// manipulated(sorted) data
    this.selectedColId = null;// active column
    this.eventEmitter = new EventEmitter(['sort']);
    this.listenerMgr = new ListenerManager();
  }

  /**
   * Specify the table DOM element you want to make sortable table
   *
   * @param {HTMLTableElement} tableEle HTML DOM Table Object<br>
   *   - Specify "sortable-table" in class of parent element of table.<br>
   *   - Specify column ID in "data-id" attribute of th element under thead tr.<br>
   *   - Add data-header attribute to data header column<br>
   *   - Assign "sortable" attribute as a th element attribute to the column to be sorted.<br>
   * Here is an example HTML of table<br><br>
   * &lt;div class=&quot;sortable-table&quot;&gt;
   &lt;table id=&quot;my-table1&quot;&gt;
   &lt;thead&gt;
   &lt;tr&gt;
   &lt;th data-id=&quot;id&quot; data-header&gt;
   &lt;div&gt;#&lt;/div&gt;
   &lt;/th&gt;
   &lt;th data-id=&quot;name&quot; sortable&gt;
   name
   &lt;/th&gt;
   &lt;th data-id=&quot;price&quot; sortable&gt;
   price($)
   &lt;/th&gt;
   &lt;th data-id=&quot;weight&quot; sortable&gt;
   weight(carat)
   &lt;/th&gt;
   &lt;/tr&gt;
   &lt;/thead&gt;
   &lt;/table&gt;
   &lt;/div&gt;
   * @returns {SortableTable}
   */
  setTable(tableEle) {
    this.tableEle = tableEle;
    this._setupColumnConfig();
    return this;
  }

  /**
   * Returns event emitter
   * you can set callback like "events().on('sort',(e)=>{});"
   * @returns {EventEmitter}
   */
  events() {
    return this.eventEmitter;
  }

  /**
   * Specify the data you want to set in the table
   * @param {Object} rows Array data combining id and value for each row.<br>example:<br>
   *   const rows = [
   {
      id: 0,
      name: 'Diamond',
      weight: 1.0,
      price: 9000,
    },
   {
      id: 1,
      name: 'Amethyst',
      weight: 3.0,
      price: 200,
    },
   {
      id: 2,
      name: 'Emerald',
      weight: 2.5,
      price: 2500,
    },
   {
      id: 3,
      name: 'Ruby',
      weight: 2.0,
      price: 2000,
    },
   ];
   * @returns {SortableTable}
   */
  setData(rows) {
    this.srcRows = rows;
    this.rows = this._cloneRows(rows);
    this._updateTableRows(this.rows);
    return this;
  }

  /**
   * Restore sorted data and sort direction to original
   * @returns {SortableTable}
   */
  resetData() {
    this._removeSortDirFromView();
    this.selectedColId = null;
    this._setupColumnConfig();// to reset this.colConfs
    this.rows = this._cloneRows(this.srcRows);
    this._updateTableRows(this.rows);
    return this;
  }

  /**
   * Returns Sorted data<br>
   *   The data returned here is different from the original data specified by setData.
   *   Because this library does not change the original data at all.
   *   If you want the sort result, call getData method.
   * @returns Sorted Data
   */
  getData() {
    return this.rows;
  }


  /*
   * Sort with column id(property name)
   * @param colId
   * @param dir direction of sort.You can set 'asc' or 'desc'
   */
  _sortRows(colId, dir) {
    this.rows.sort((a, b) => {
      const sign = dir === 'asc' ? 1 : -1;
      if (a[colId] < b[colId]) {
        return -1 * sign;
      }
      if (a[colId] > b[colId]) {
        return sign;
      }
      return 0;
    });
  }

  _hasAttr(ele, attrName) {
    return ele.hasAttribute(attrName);
  }

  _isElementSortable(ele) {
    return this._hasAttr(ele, 'sortable');
  }

  _cloneRows(rows) {
    return JSON.parse(JSON.stringify(rows));
  }

  _isElementDataHeader(ele) {
    return this._hasAttr(ele, 'data-header');
  }

  _onSortClick(e) {
    const clickedColEle = e.target;
    const clickedColId = clickedColEle.getAttribute('data-id');
    this.sort(clickedColId);
  }

  _removeSortDirFromView() {
    const thEles = this.tableEle.querySelectorAll('th');
    for (const thEle of thEles) {
      thEle.classList.remove('sort-desc');
      thEle.classList.remove('sort-asc');
    }
  }

  /**
   * Sort by the specified column ID.
   * If the sort direction has been specified,
   * the sort is forcibly performed in the specified sort direction.
   *
   * Otherwise,
   * If the column is active(selected), reverse the sort direction.
   * If the column is NOT active, Sort in the previous sort direction
   *
   * @param {String} colId Specify the column id (specified by data-id) you want to sort
   * @param {String} forceSortDir Optional.<br>
   If specified, sort forcibly.<br>
   Any one of the following three can be set.<br>
   asc: Sort specified columns in ascending order<br>
   desc: Sort specified columns in descending order<br>
   toggle: Reverse the current sort direction<br>
   */
  sort(colId, forceSortDir) {
    const clickedColEle = this.tableEle.querySelector(`[data-id="${colId}"]`);
    const clickedColConf = this._getColumnConf(colId);
    if (!clickedColConf) {
      throw Error(`data-id "${colId}" is not found.`);
    }
    // clear sort direction icon first
    this._removeSortDirFromView();

    if (forceSortDir) {
      // force sort from non-UI
      this.selectedColId = colId;
      if (forceSortDir === 'toggle') {
        clickedColConf.sortDir = this._getInversedSortDir(clickedColConf.sortDir);
      } else {
        clickedColConf.sortDir = forceSortDir;
      }
    } else if (!forceSortDir) {
      if (this.selectedColId === colId) {
        // selected col is NOT changed
        // inverse sort direction
        clickedColConf.sortDir = this._getInversedSortDir(clickedColConf.sortDir);
      } else {
        // selected col is changed
        this.selectedColId = colId;
      }
    }
    // Sort the contents of stored row data according to conditions
    clickedColEle.classList.add(`sort-${clickedColConf.sortDir}`);
    this._sortRows(colId, clickedColConf.sortDir);
    // reflect the update result of the sort to the view
    this._updateTableRows(this.rows);

    this.eventEmitter.emit('sort', {
      target: this.tableEle,
      colId,
      sortDir: clickedColConf.sortDir,
      data: this.rows,
    });
  }

  _getInversedSortDir(sortDir) {
    if (!sortDir || sortDir === 'desc') {
      return 'asc';
    }
    return 'desc';
  }

  _setupColumnConfig() {
    // this._removeTbody();// remove tbody because "tbody>th" element before reset may remain.
    this.colConfs = new Map();
    const thEles = this.tableEle.querySelectorAll('thead tr th');
    for (const thEle of thEles) {
      const attrDataId = thEle.getAttribute('data-id');
      const isElementDataHeader = this._isElementDataHeader(thEle);
      const isSortable = this._isElementSortable(thEle);

      if (isSortable) {
        thEle.classList.add('sortable');
        const listener = this._onSortClick.bind(this);
        const listeneName = 'sortable-table-on-click';
        this.listenerMgr.removeListener(thEle, 'click', listeneName);
        this.listenerMgr.addListener(thEle, 'click', listener, listeneName);
        thEle.classList.add('sort');
      }

      const colmnConf = {
        id: attrDataId,
        isHeader: isElementDataHeader,
        sortable: isSortable,
        sortDir: 'asc', // default is asc
      };

      this.colConfs.set(attrDataId, colmnConf);
    }
  }

  _getColumnConf(colId) {
    return this.colConfs.get(colId);
  }

  _getColumnConfAll() {
    return this.colConfs;
  }

  _removeTbody() {
    const tbodyEle = this.tableEle.querySelector('tbody');
    if (tbodyEle) {
      this.tableEle.removeChild(tbodyEle);
    }
  }

  /*
   * update view
   */
  _updateTableRows() {
    // remove existing tbody first
    this._removeTbody();

    let trHtml = '<tbody>';
    for (const rowData of this.rows) {
      trHtml += '<tr>';
      for (const colConf of this.colConfs.values()) {
        const colData = rowData[colConf.id];
        if (colConf.isHeader) {
          if (typeof colData !== 'undefined') {
            trHtml += `<th>${colData}</th>`;
          } else {
            trHtml += '<th></th>';
          }
        } else if (!colConf.isHeader) {
          if (typeof colData !== 'undefined') {
            trHtml += `<td>${colData}</td>`;
          } else {
            trHtml += '<td></td>';
          }
        }
      }
      trHtml += '</tr>';
    }
    trHtml += '</tbody>';

    this.tableEle.insertAdjacentHTML('beforeEnd', trHtml);
  }
}
