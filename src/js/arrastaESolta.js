(function ($) {
    'use strict';
    $('.mural').on('dragstart', '.cartao', function (e) {
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        e.originalEvent.dataTransfer.setData('id', this.id);
        $(this).addClass('cartao--drag');
    });
    $('.mural').on('dragend', '.cartao', function () {
      $(this).removeClass('cartao--drag');
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
        var idOrigem = e.originalEvent.dataTransfer.getData('id');
        var origem = $('#' + idOrigem);
        $(origem).removeClass('cartao--drag');
        var destino = $(this);
        destino.removeClass('cartao--drop');
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
