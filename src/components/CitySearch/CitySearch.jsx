import React from "react";
import { Command } from "cmdk";

function CitySearch() {
  return (
    <Command label="Command Menu">
      <Command.Input placeholder="Search for a city, e.g., New York" />
      <Command.List>
        {/* <Command.Empty>No results found.</Command.Empty> */}

        {/* Ensure unique key and value */}
        {/* <Command.Group heading="Letters">
          <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item>
        </Command.Group>

        <Command.Item>Apple</Command.Item> */}
      </Command.List>
    </Command>
  );
}

export default CitySearch;
