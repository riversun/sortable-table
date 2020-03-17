# @riversun/sortable-table

[![npm version](https://badge.fury.io/js/%40riversun%2Fsortable-table.png)](https://badge.fury.io/js/%40riversun%2Fsortable-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/riversun/sortable-table.svg?style=shield)](https://circleci.com/gh/riversun/sortable-table)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bd35641c855b4556afc1076c294f110d)](https://app.codacy.com/manual/riversun/sortable-table?utm_source=github.com&utm_medium=referral&utm_content=riversun/sortable-table&utm_campaign=Badge_Grade_Dashboard)
[![Coverage Status](https://coveralls.io/repos/github/riversun/sortable-table/badge.svg)](https://coveralls.io/github/riversun/sortable-table)

This library makes tables sortable.
- Make the table sortable
- Wroks with plain HTML, Bootstrap, Vue, React and etc.
- No external library required, works as a standalone, no dependency.
- A small size library , 13KB including images.

 
# Demo

- [Demo with plain HTML](https://riversun.github.io/sortable-table/)  
![riversun_sortable_table](https://user-images.githubusercontent.com/11747460/76847661-c39ce580-6885-11ea-9750-d39435776915.gif)

- [Demo with Bootstrap4](https://riversun.github.io/sortable-table/index_with_bootstrap.html)  
![riversun_sortable_table_bt4](https://user-images.githubusercontent.com/11747460/76847664-c4ce1280-6885-11ea-9114-c0e40535142e.gif)

# How to install

- **NPM**

```
npm install @riversun/sortable-table
```

or 

- **use `<script>` tag**  from CDN

```html                                      
<script src="https://cdn.jsdelivr.net/npm/@riversun/sortable-table@1.0.0/lib/sortable-table.js"></script>
```

# Usage

## HTML and code
 
Here is the typical code for sortable-table.

Use **thead tr th** for the table header element.
Specify the **data-id** attribute for the header element **th**.
The **data-id** attribute is linked to the key in data.


 ```html
<!DOCTYPE html>
<html lang="en">
<body>
<div class="sortable-table">
    <table id="my-table1">
        <thead>
        <tr>
            <th data-id="id" data-header>
                <div>#</div>
            </th>
            <th data-id="name" sortable>
                name
            </th>
            <th data-id="price" sortable>
                price($)
            </th>
            <th data-id="weight" sortable>
                weight(carat)
            </th>
        </tr>
        </thead>
    </table>
</div>

<script src="https://cdn.jsdelivr.net/npm/@riversun/sortable-table@1.0.0/lib/sortable-table.js"></script>
<script>

  const data = [
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

  const sortableTable = new SortableTable();

  // set table element
  sortableTable.setTable(document.querySelector('#my-table1'));
  // set data to be sorted
  sortableTable.setData(data);
  // handling events
  sortableTable.events()
      .on('sort', (event) => {
        console.log(`[SortableTable#onSort]
      event.colId=${event.colId}
      event.sortDir=${event.sortDir}
      event.data=\n${JSON.stringify(event.data)}`);
      });

</script>
</body>
</html>

``` 

# APIs and Methods

Open [Classes and Methods](api.md)


