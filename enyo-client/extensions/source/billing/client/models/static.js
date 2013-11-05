XT.extensions.billing.initStaticModels = function () {
  'use strict';
  // These are hard coded collections that may be turned into tables at a later date
  var i, K;

  // Receivable Types
  K = XM.Receivable;
  var receivableTypeJson = [
    { id: K.INVOICE, name: "_invoice".loc() },
    { id: K.DEBIT_MEMO, name: "_debitMemo".loc() },
    { id: K.CREDIT_MEMO, name: "_creditMemo".loc() },
    { id: K.CUSTOMER_DEPOSIT, name: "_customerDeposit".loc() }
  ];
  XM.ReceivableTypeModel = Backbone.Model.extend({});
  XM.ReceivableTypeCollection = Backbone.Collection.extend({
    model: XM.ReceivableTypeModel
  });
  XM.receivableTypes = new XM.ReceivableTypeCollection();
  for (i = 0; i < receivableTypeJson.length; i++) {
    var receivableType = new XM.ReceivableTypeModel(receivableTypeJson[i]);
    XM.receivableTypes.add(receivableType);
  }

  /**
    * @enum
    * Bi-directional mapping of Funds Types
    */
  XM.FundsTypes = {
    CHECK:             'C',
    CERTIFIED_CHECK:   'T',
    CASH:              'K',
    MASTERCARD:        'M',
    VISA:              'V',
    AMERICAN_EXPRESS:  'A',
    DISCOVER:          'D',
    OTHER_CREDIT_CARD: 'R',
    WIRE_TRANSFER:     'W',
    OTHER:             'O',

    /**
     * Returns true if the given fundsType is a credit card type, false
     * otherwise
     */
    isCreditCard: function (fundsType) {
      return _.contains([ 'M', 'V', 'A', 'D', 'R' ], fundsType);
    }
  };
  XM.FundsTypes = _.extend(_.invert(XM.FundsTypes));

  /**
    * @enum
    * Cash Receipt Balance Application Options
    */
  XM.CashReceiptApplyBalanceOption = {
    APPLY_BALANCE_TO_CREDIT_MEMO:      false,
    APPLY_BALANCE_TO_CUSTOMER_DEPOSIT: true
  };
};
