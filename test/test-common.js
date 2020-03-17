export function createHTML() {
  // Set up our document body
  document.body.innerHTML = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="riversun">

</head>
<body>

<div class="sortable-table">
    <table id="my-table">
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
  `;
}


export const data = [
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

export const dataIncludingSame = [
  {
    id: 0,
    name: 'Diamond',
    weight: 1.0,
    price: 9000,
  },
  {
    id: 1,
    name: 'Pearl',
    weight: 100.0,
    price: 9000,
  },
];

export function createHTMLForListenerManager() {
  // Set up our document body
  document.body.innerHTML = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="riversun">
</head>
<body>
<button id="myButton">MyButton</button>
<button id="myButton2">MyButton2</button>
`;
}
