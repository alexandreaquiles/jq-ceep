(function ($) {
    'use strict';
    $('.mural').on('dragstart', '.cartao', function (e) {
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        e.originalEvent.dataTransfer.setData('id', this.id);
    });
    $('.mural').on('dragenter', '.cartao', function () {
        $(this).addClass('cartao--drop');
    });
    $('.mural').on('dragleave', '.cartao', function () {
        $(this).removeClass('cartao--drop');
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
