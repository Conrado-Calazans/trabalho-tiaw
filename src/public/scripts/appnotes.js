// Notes Application Class
class NotesApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.currentId = null;
        this.init();
    }

    init() {
        // DOM Elements
        this.noteForm = document.getElementById('noteForm');
        this.noteTitle = document.getElementById('noteTitle');
        this.noteContent = document.getElementById('noteContent');
        this.notesList = document.getElementById('notesList');
        this.searchInput = document.getElementById('searchInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.cancelBtn = document.getElementById('cancelBtn');

        // Event Listeners
        this.noteForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.cancelBtn.addEventListener('click', () => this.cancelEdit());

        this.renderNotes();
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.currentId) {
            this.updateNote();
        } else {
            this.addNote();
        }

        this.noteForm.reset();
        this.currentId = null;
        this.submitBtn.textContent = 'Adicionar Anotação';
        this.cancelBtn.style.display = 'none';
    }

    addNote() {
        const note = {
            id: Date.now(),
            title: this.noteTitle.value,
            content: this.noteContent.value,
            date: new Date().toLocaleString()
        };

        this.notes.push(note);
        this.saveNotes();
        this.renderNotes();
    }

    updateNote() {
        const index = this.notes.findIndex(note => note.id === this.currentId);
        if (index !== -1) {
            this.notes[index] = {
                ...this.notes[index],
                title: this.noteTitle.value,
                content: this.noteContent.value,
                date: new Date().toLocaleString()
            };
            this.saveNotes();
            this.renderNotes();
        }
    }

    editNote(id) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            this.currentId = note.id;
            this.noteTitle.value = note.title;
            this.noteContent.value = note.content;
            this.submitBtn.textContent = 'Atualizar Anotação';
            this.cancelBtn.style.display = 'inline-block';
        }
    }

    deleteNote(id) {
        if (confirm('Tem certeza que deseja excluir esta nota?')) {
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveNotes();
            this.renderNotes();
        }
    }

    cancelEdit() {
        this.noteForm.reset();
        this.currentId = null;
        this.submitBtn.textContent = 'Adicionar Anotação';
        this.cancelBtn.style.display = 'none';
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredNotes = this.notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm)
        );
        this.renderNotes(filteredNotes);
    }

    renderNotes(notesToRender = this.notes) {
        this.notesList.innerHTML = notesToRender.map(note => `
            <div class="note-card" data-id="${note.id}">
                <h3 class="note-title">${note.title}</h3>
                <p class="note-content">${note.content}</p>
                <small>Última atualização: ${note.date}</small>
                <div class="note-actions">
                    <button class="edit-btn" onclick="notesApp.editNote(${note.id})">Editar</button>
                    <button class="delete-btn" onclick="notesApp.deleteNote(${note.id})">Excluir</button>
                </div>
            </div>
        `).join('');
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}

// Initialize the application
const notesApp = new NotesApp();