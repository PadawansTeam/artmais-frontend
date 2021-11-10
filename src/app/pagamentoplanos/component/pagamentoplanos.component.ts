import { Component, OnInit } from '@angular/core';
import { ExternalService } from '../service/external.service';
import { PagamentoplanosService } from '../service/pagamentoplanos.service';

@Component({
  selector: 'app-pagamentoplanos',
  templateUrl: './pagamentoplanos.component.html',
  styleUrls: ['./pagamentoplanos.component.css']
})
export class PagamentoplanosComponent implements OnInit {

  constructor(
    private scriptService: ExternalService,
    private pagamentoSerice: PagamentoplanosService
  ) { }

  ngOnInit(): void {
    this.scriptService.load('MercadoPago').then(data => {
  }).catch(error => console.log(error));
    //@ts-ignore
    const mp = new MercadoPago('YOUR_PUBLIC_KEY');
    const cardForm = mp.cardForm({
      amount: "100.5",
      autoMount: true,
      form: {
        id: "form-checkout",
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        cardExpirationMonth: {
          id: "form-checkout__cardExpirationMonth",
          placeholder: "Mês de vencimento",
        },
        cardExpirationYear: {
          id: "form-checkout__cardExpirationYear",
          placeholder: "Ano de vencimento",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn("Form Mounted handling error: ", error);
        },
        onSubmit: (event: any) => {
          event.preventDefault();
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          fetch("/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Descrição do produto",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          });
        },
        onFetching: (resource: any) => {
          const progressBar = document.querySelector(".progress-bar");
          progressBar!.removeAttribute("value");
          return () => {
            progressBar!.setAttribute("value", "0");
          };
        },
      },
    });
  }

  botaoPagar(){
    this.pagamentoSerice.insertPagamento().subscribe(
      (response) => {
      },
      (err) => {
        throw err;
      },
    );  
  }
}
