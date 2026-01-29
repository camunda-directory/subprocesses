export const ui = {
  en: {
    "nav.search": "Search processes... ⌘K",
    "nav.submit": "Submit Process",
    "home.title": "Subprocess Hub",
    "home.subtitle": "A catalog of reusable BPMN subprocesses",
    "process.download": "Download XML",
    "process.copy": "Copy to Clipboard",
    "process.edit": "Edit on GitHub",
    "filter.category": "Category",
    "filter.complexity": "Complexity",
    "complexity.low": "Simple",
    "complexity.mid": "Moderate",
    "complexity.high": "Complex",
  },
  de: {
    "nav.search": "Prozesse suchen... ⌘K",
    "nav.submit": "Prozess einreichen",
    "home.title": "Subprocess Hub",
    "home.subtitle": "Ein Katalog wiederverwendbarer BPMN-Subprozesse",
    "process.download": "XML herunterladen",
    "process.copy": "In Zwischenablage kopieren",
    "process.edit": "Auf GitHub bearbeiten",
    "filter.category": "Kategorie",
    "filter.complexity": "Komplexität",
    "complexity.low": "Einfach",
    "complexity.mid": "Moderat",
    "complexity.high": "Komplex",
  },
  es: {
    "nav.search": "Buscar procesos... ⌘K",
    "nav.submit": "Enviar Proceso",
    "home.title": "Subprocess Hub",
    "home.subtitle": "Un catálogo de subprocesos BPMN reutilizables",
    "process.download": "Descargar XML",
    "process.copy": "Copiar al portapapeles",
    "process.edit": "Editar en GitHub",
    "filter.category": "Categoría",
    "filter.complexity": "Complejidad",
    "complexity.low": "Simple",
    "complexity.mid": "Moderado",
    "complexity.high": "Complejo",
  },
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof lang]) {
    return ui[lang][key] || ui.en[key];
  };
}
