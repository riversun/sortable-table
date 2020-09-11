# @riversun/sortable-table

[![npm version](https://badge.fury.io/js/%40riversun%2Fsortable-table.png)](https://badge.fury.io/js/%40riversun%2Fsortable-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/riversun/sortable-table.svg?style=shield)](https://circleci.com/gh/riversun/sortable-table)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/281c9676d22a487491df79f5d738e9f9)](https://www.codacy.com/manual/riversun/sortable-table?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=riversun/sortable-table&amp;utm_campaign=Badge_Grade)
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

And import like,

```
import SortableTable from '@riversun/sortable-table';
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


## Custom rendering cells

You can customize cell-rendering by specifying rendering function with #setCellRenderer like as follows. 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous">
    <style>
        body {
            padding-top: 60px;
        }
    </style>
</head>
<body>

<header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">Sortable-table on Bootstrap</a>
    </nav>
</header>


<div class="container-fluid">


    <div class="row">

        <div class="p-1 col-sm-12 sortable-table">

            <table class="table table-hover table-bordered" id="my-table1">
                <thead>
                <tr>
                    <th scope="col" data-id="id" data-header>
                        <div>#</div>
                    </th>
                    <th scope="col" data-id="name" sortable>
                        name
                    </th>
                    <th scope="col" data-id="url" sortable>
                        url
                    </th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
    <div class="row">
        <div class="p-1 col-sm-12">
            <h5>Sort by code</h5>
        </div>
    </div>
    <div class="row">
        <div class="p-1 col-sm-12 d-flex justify-content-around">
            <button id="btnSortName" class="btn btn-primary m-1 w-100">Sort by Name(toggle)</button>
            <button id="btnSortPrice" class="btn btn-primary m-1 w-100">Sort by Price(asc)</button>
            <button id="btnSortWeight" class="btn btn-primary m-1 w-100">Sort by Weight(desc)</button>
            <button id="btnReset" class="btn btn-primary m-1 w-100">Reset</button>
        </div>
    </div>

</div>


<script src="sortable-table.js"></script>
<script>

  const data = [
    {
      id: 0,
      name: 'Apple',
      url: 'https://www.apple.com'
    },
    {
      id: 1,
      name: 'Amazon',
      url: 'https://www.amazon.com'
    },
    {
      id: 2,
      name: 'Google',
      url: 'https://www.google.com'
    },
    {
      id: 3,
      name: 'Facebook',
      url: 'https://www.facebook.com'
    },
  ];

  const sortableTable = new SortableTable();
  // set table element
  sortableTable.setTable(document.querySelector('#my-table1'));

  // set callback function for table cell custom rendering
  sortableTable.setCellRenderer((col, row) => {
    const colValue = row[col.id];
    // cell-is-a-header
    if (col.isHeader) {
      if (typeof colValue !== 'undefined') {
        return `<th>${colValue}</th>`;
      }
      return '<th></th>';
    }
    // cell-is-not-a-header
    if (typeof colValue !== 'undefined') {
      if (col.id === 'url') {
        return `<td><a href="${colValue}" target="_blank">${colValue}</a></td>`;
      }
      return `<td>${colValue}</td>`;
    }
    return '<td></td>';
  });
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

  // button handlers
  document.querySelector('#btnSortName')
    .addEventListener('click', () => {
      sortableTable.sort('name', 'toggle');//'asc','desc','toggle'
    });
  document.querySelector('#btnSortPrice')
    .addEventListener('click', () => {
      sortableTable.sort('price', 'asc');
    });
  document.querySelector('#btnSortWeight')
    .addEventListener('click', () => {
      sortableTable.sort('weight', 'desc');
    });
  document.querySelector('#btnReset')
    .addEventListener('click', () => {
      sortableTable.resetData();
    });


</script>
</body>
</html>

```

# APIs and Methods

Open [Classes and Methods](api.md)


