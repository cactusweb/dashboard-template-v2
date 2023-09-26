import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ryodan-back-link',
  template: `
    <a routerLink="/dashboard" class="row">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="12"
        viewBox="0 0 17 12"
        fill="none"
      >
        <path
          id="Arrow 3"
          d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23744 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.469669 5.46967ZM17 5.25L1 5.25V6.75L17 6.75V5.25Z"
          fill="#BCBCBC"
        />
      </svg>
      <span>Back to Dash</span>
    </a>
  `,
  styles: [
    `
      :host {
        display: grid;
        justify-content: start;
      }
      a {
        gap: 4px;
        color: #bcbcbc;
      }
      a svg {
        transition: 0.3s;
      }
      a:hover svg {
        transform: translate(-5px, 0);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanBackLinkComponent {}