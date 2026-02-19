/**
 * Disable Enter to Send
 *
 * ChatGPT / Claude.ai でReturnキーによるメッセージ送信を無効化します。
 * メッセージの送信は送信ボタンで行ってください。
 * 改行は Shift+Enter で入力できます。
 */

(function () {
  'use strict';

  /**
   * 対象の入力要素かどうかを判定します。
   * - contenteditable 要素（ChatGPT / Claude.ai の入力欄）
   * - textarea 要素
   */
  function isInputTarget(element) {
    if (!element) return false;
    if (element.tagName === 'TEXTAREA') return true;
    if (element.isContentEditable) return true;
    return false;
  }

  /**
   * キーダウンイベントのハンドラ。
   * 修飾キーなしの Enter を検知し、サイト側のハンドラ（送信処理）へ
   * イベントが伝達されないよう stopImmediatePropagation() で停止します。
   */
  function onKeyDown(event) {
    if (event.key !== 'Enter') return;

    // Shift / Ctrl / Meta / Alt と組み合わせた Enter はそのまま通す
    if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;

    if (!isInputTarget(event.target)) return;

    // キャプチャフェーズで先にイベントを止め、
    // サイト側の「Enterで送信」ハンドラに届かないようにする
    event.stopImmediatePropagation();

    // preventDefault() は呼ばないことで、ブラウザ側のデフォルト動作
    //（contenteditable での改行など）を妨げません。
    // ただし多くの AI チャットのエディタはJS側で改行を制御しているため、
    // 見た目上 Enter が無反応になることがあります。
    // その場合は Shift+Enter で改行してください。
  }

  // キャプチャフェーズで登録することで、サイト側のイベントリスナーより先に実行される
  document.addEventListener('keydown', onKeyDown, true);
})();
