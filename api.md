## Classes

<dl>
<dt><a href="#SortableTable">SortableTable</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setTable">setTable(tableEle)</a> ⇒ <code><a href="#SortableTable">SortableTable</a></code></dt>
<dd><p>Specify the table DOM element you want to make sortable table</p>
</dd>
<dt><a href="#events">events()</a> ⇒ <code>EventEmitter</code></dt>
<dd><p>Returns event emitter
you can set callback like &quot;events().on(&#39;sort&#39;,(e)=&gt;{});&quot;</p>
</dd>
<dt><a href="#setData">setData(rows)</a> ⇒ <code><a href="#SortableTable">SortableTable</a></code></dt>
<dd><p>Specify the data you want to set in the table</p>
</dd>
<dt><a href="#resetData">resetData()</a> ⇒ <code><a href="#SortableTable">SortableTable</a></code></dt>
<dd><p>Restore sorted data and sort direction to original</p>
</dd>
<dt><a href="#getData">getData()</a> ⇒</dt>
<dd><p>Returns Sorted data<br>
  The data returned here is different from the original data specified by setData.
  Because this library does not change the original data at all.
  If you want the sort result, call getData method.</p>
</dd>
<dt><a href="#sort">sort(colId, forceSortDir)</a></dt>
<dd><p>Sort by the specified column ID.
If the sort direction has been specified,
the sort is forcibly performed in the specified sort direction.</p>
<p>Otherwise,
If the column is active(selected), reverse the sort direction.
If the column is NOT active, Sort in the previous sort direction</p>
</dd>
</dl>

<a name="SortableTable"></a>

## SortableTable
**Kind**: global class  
**Author**: Tom Misawa (riversun.org@gmail.com,https://github.com/riversun)  
<a name="new_SortableTable_new"></a>

### new SortableTable()
This library makes tables sortable.<br>
 - Make the table sortable<br>
 - Wroks with plain HTML, Bootstrap, Vue, React and etc.<br>
 - No external library required, works as a standalone, no dependency.<br>
 - A small size library , 13KB including images.<br>

MIT License

<a name="setTable"></a>

## setTable(tableEle) ⇒ [<code>SortableTable</code>](#SortableTable)
Specify the table DOM element you want to make sortable table

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tableEle | <code>HTMLTableElement</code> | HTML DOM Table Object<br>   - Specify "sortable-table" in class of parent element of table.<br>   - Specify column ID in "data-id" attribute of th element under thead tr.<br>   - Add data-header attribute to data header column<br>   - Assign "sortable" attribute as a th element attribute to the column to be sorted.<br> Here is an example HTML of table<br><br> &lt;div class=&quot;sortable-table&quot;&gt;    &lt;table id=&quot;my-table1&quot;&gt;    &lt;thead&gt;    &lt;tr&gt;    &lt;th data-id=&quot;id&quot; data-header&gt;    &lt;div&gt;#&lt;/div&gt;    &lt;/th&gt;    &lt;th data-id=&quot;name&quot; sortable&gt;    name    &lt;/th&gt;    &lt;th data-id=&quot;price&quot; sortable&gt;    price($)    &lt;/th&gt;    &lt;th data-id=&quot;weight&quot; sortable&gt;    weight(carat)    &lt;/th&gt;    &lt;/tr&gt;    &lt;/thead&gt;    &lt;/table&gt;    &lt;/div&gt; |

<a name="events"></a>

## events() ⇒ <code>EventEmitter</code>
Returns event emitter
you can set callback like "events().on('sort',(e)=>{});"

**Kind**: global function  
<a name="setData"></a>

## setData(rows) ⇒ [<code>SortableTable</code>](#SortableTable)
Specify the data you want to set in the table

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| rows | <code>Object</code> | Array data combining id and value for each row.<br>example:<br>   const rows = [    {       id: 0,       name: 'Diamond',       weight: 1.0,       price: 9000,     },    {       id: 1,       name: 'Amethyst',       weight: 3.0,       price: 200,     },    {       id: 2,       name: 'Emerald',       weight: 2.5,       price: 2500,     },    {       id: 3,       name: 'Ruby',       weight: 2.0,       price: 2000,     },    ]; |

<a name="resetData"></a>

## resetData() ⇒ [<code>SortableTable</code>](#SortableTable)
Restore sorted data and sort direction to original

**Kind**: global function  
<a name="getData"></a>

## getData() ⇒
Returns Sorted data<br>
  The data returned here is different from the original data specified by setData.
  Because this library does not change the original data at all.
  If you want the sort result, call getData method.

**Kind**: global function  
**Returns**: Sorted Data  
<a name="sort"></a>

## sort(colId, forceSortDir)
Sort by the specified column ID.
If the sort direction has been specified,
the sort is forcibly performed in the specified sort direction.

Otherwise,
If the column is active(selected), reverse the sort direction.
If the column is NOT active, Sort in the previous sort direction

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| colId | <code>String</code> | Specify the column id (specified by data-id) you want to sort |
| forceSortDir | <code>String</code> | Optional.<br>    If specified, sort forcibly.<br>    Any one of the following three can be set.<br>    asc: Sort specified columns in ascending order<br>    desc: Sort specified columns in descending order<br>    toggle: Reverse the current sort direction<br> |

