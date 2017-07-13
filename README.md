# priorityNav

## Example use

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .testList {
            white-space: nowrap; /* Required for width calculation */
            font-size: 0;
            padding: 0;
            margin: 0;
            list-style: none;
        }

            .testList li {
                display: inline-block;
                padding: 10px 40px;
                margin: 10px;
                background: #ccc;
                font-size: 1rem;
            }

        .testOverflow {
            display: none;
        }
    </style>
</head>
<body>
    <ul class="testList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4 extra long name</li>
      <li>Item 5</li>
      <li>Item 6</li>
      <li>Item 7</li>
      <li>Item 8</li>
      <li>Item 10</li>
      <li>Item 11</li>
      <li>Item 12 another long name</li>
      <li>Item 13</li>
      <li>Item 14</li>
      <li>Item 15</li>
  </ul>
  <ul class="testOverflow"></ul>
  <script src="priorityNav.js"></script>
<script>
  var list = document.querySelector('.testList');
  var overflow = document.querySelector('.testOverflow');
  priorityNav.watchNav(list, overflow);
</script>
</body>
</html>
```
