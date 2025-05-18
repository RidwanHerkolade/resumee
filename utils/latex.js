export const generateLatex = (data) => {
    return `
  \\documentclass[a4paper,11pt]{article}
  \\usepackage[top=1in, bottom=1in, left=1in, right=1in]{geometry}
  \\usepackage{xcolor}
  \\usepackage{titlesec}
  \\usepackage{enumitem}
  \\usepackage{parskip}
  \\usepackage{helvet}
  \\renewcommand{\\familydefault}{\\sfdefault}
  
  % Styling sections
  \\titleformat{\\section}{\\color{blue}\\large\\bfseries}{}{0em}{}[\\titlerule]
  \\titleformat{\\subsection}{\\bfseries}{}{0em}{}
  
  \\begin{document}
  \\thispagestyle{empty}
  
  \\begin{center}
    {\\Huge\\bfseries ${data.fullName} \\\\[1ex]}
  \\end{center}
  
  \\section*{Summary}
  ${data.summary}
  
  \\section*{Experience}
  ${data.experience}
  
  \\section*{Education}
  ${data.education}
  
  \\section*{Skills}
  \\begin{itemize}[leftmargin=*]
    \\item ${data.skills.split(',').join('\\item ')}
  \\end{itemize}
  
  \\end{document}
  `;
  };

