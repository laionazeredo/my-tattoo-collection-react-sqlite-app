// my_tattoo_collection/src/components/tattoos_list_row.tsx

// Import deps
import React from 'react'

// Create interfaces
interface TattoosListRowUI {
  position: number;
  tattoo: {
    id: number;
    reference: string;
    title: string;
    wheniwant: string;
    desirelevel: string;
  }
  handleTattooRemove: (id: number, title: string) => void;
}

// Create tattoosListRow component
export const TattoosListRow = (props: TattoosListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>
    <td className="table-item">
      {props.tattoo.title}
    </td>
    <td className="table-item">
      {props.tattoo.reference}
    </td>
    <td className="table-item">
      {props.tattoo.wheniwant}
    </td>
    <td className="table-item">
      {props.tattoo.desirelevel}
    </td>
    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleTattooRemove(props.tattoo.id, props.tattoo.title)}>
        Remove tattoo
      </button>
    </td>
  </tr>
)