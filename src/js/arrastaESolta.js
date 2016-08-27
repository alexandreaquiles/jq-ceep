(function ($) {
    'use strict';
    $('.mural').on('dragstart', '.cartao', function (e) {
        var cartao = this;
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        e.originalEvent.dataTransfer.setData('id', cartao.id);
        $('.opcoesDoCartao', cartao).hide();
        setTimeout(function () {
          $('.opcoesDoCartao', cartao).show();
        }, 0);
    });
    $('.mural').on('dragenter', '.cartao,.cartao-conteudo', function () {
      $(this).closest('.cartao').addClass('cartao--drop');
    });
    $('.mural').on('dragleave', '.cartao', function () {
      $(this).closest('.cartao').removeClass('cartao--drop');
    });
    $('.mural').on('dragover', '.cartao', function (e) {
        e.preventDefault();
        e.originalEvent.dataTransfer.dropEffect = 'move';
    });
    $('.mural').on('drop', '.cartao', function (e) {
        e.stopPropagation();
        $('.cartao').removeClass('cartao--drop');
        var idOrigem = e.originalEvent.dataTransfer.getData('id');
        var origem = $('#' + idOrigem);
        var destino = $(this);
        var idDestino = destino.attr('id');
        if (idOrigem === idDestino) {
          return true;
        }
        var origemHTML = origem.prop('outerHTML');
        var destinoHTML = destino.prop('outerHTML');
        destino.prop('outerHTML', origemHTML);
        origem.prop('outerHTML', destinoHTML);
        $(document).trigger('precisaSincronizar');
    });
}(jQuery));
