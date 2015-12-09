/**
 * Create the Todo namespace
 */
var Todo = (function(my) {

    /**
     * Add handling for main controls
     * @constructor
     */
    my.Control = function() {

        /**
         * Binds the main events
         */
        function bindEvents() {
            $('span.edit').on('click', editClicked);
            $('span.complete').on('click', completeClicked);
            $('span.remove').on('click', removeClicked);
        }

        /**
         * Triggered when the 'edit' icon is clicked. Modifies the add form to handle edits.
         *
         * @param event The event
         */
        function editClicked(event) {
            var $row   = $(event.currentTarget).closest('tr'),
                id     = $row.data('task-id'),
                action = '/edit/' + id,
                $form  = $('form[name=addeditform]'),
                task   = $row.find('td.task').html()
            ;

            $form.attr('action', action);
            $form.find('input[name=task]').val(task).focus();
        }

        /**
         * Triggered when the 'complete' icon is clicked. Marks the task
         * complete or todo, depending on the current state.
         *
         * @param event
         */
        function completeClicked(event) {
            var $row     = $(event.currentTarget).closest('tr'),
                id       = $row.data('task-id'),
                complete = $row.hasClass('complete'),
                url      = '/complete/' + id + '/' + (complete ? '0' : '1');

            document.location.href = url;
        }

        /**
         * Triggered when the 'remove' icon is clicked. Removes the task.
         *
         * @param event
         */
        function removeClicked(event) {
            var $row = $(event.currentTarget).closest('tr'),
                id   = $row.data('task-id'),
                url  = '/delete/' + id
            ;

            document.location.href = url;
        }

        /**
         * Inits the component
         */
        function init() {
            bindEvents();
        }

        /**
         * Calls initialization
         */
        init();
    };

    /**
     * Loads the component when document is loaded
     */
    $(function() {
        my.Control();
    });

    return my;
}(Todo || {}));
