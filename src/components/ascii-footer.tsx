const HANDS_ART = `
                                                                                                    
                         .::.                                                                       
                       .::::::..                                                                    
                     .:::::::::::.                                                                  
                   .:::::::::::::::.                                   .::::.                        
                 .:::::::::::::::::.                                 .:::::::::.                     
                .::::::::::::::::::.                               .::::::::::::.                    
               .:::::::::::::::::::.                              .::::::::::::::                    
              .::::::::::::::::::::                              .:::::::::::::::                    
             .::::::::::::::::::::                              .::::::::::::::::                    
            .::::::::::::::::::::.                             .:::::::::::::::::.                   
           .::::::::::::::::::::                              .::::::::::::::::::                    
          .::::::::::::::::::::.                              .::::::::::::::::::.                   
         .::::::::::::::::::::.                               .::::::::::::::::::                    
         .:::::::::::::::::::                                  .:::::::::::::::::.                   
        .:::::::::::::::::::.                                   .:::::::::::::::::                   
        .::::::::::::::::::                                      .::::::::::::::::                   
       .::::::::::::::::::.                                       .:::::::::::::::                   
       .:::::::::::::::::.                                         .::::::::::::::                   
       .::::::::::::::::                                            .:::::::::::::.                  
       ::::::::::::::::                                              .:::::::::::::.                 
       .::::::::::::::                                                .:::::::::::::                 
        :::::::::::::.                                                 .::::::::::::                 
        .:::::::::::                                                    .:::::::::::                 
         .:::::::::                                                      .::::::::::                 
          ::::::::                                                        .:::::::::                 
           .::::::.                                                        .::::::::                 
            .:::::.                                                         .:::::::.                
              ::::                                                            ::::::                 
               .::                                                             .::::                 
                 .                                                               .::                 
                                                                                   .                 
`;

export function AsciiFooter() {
  return (
    <footer className="w-full overflow-hidden bg-black border-t border-border/40 relative" aria-label="ASCII art footer">
      {/* Subtle purple glow border at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168, 130, 255, 0.4) 30%, rgba(168, 130, 255, 0.6) 50%, rgba(168, 130, 255, 0.4) 70%, transparent)",
        }}
      />
      <pre
        aria-hidden="true"
        className="font-mono text-[0.35rem] sm:text-[0.5rem] md:text-[0.6rem] leading-[1.15] text-foreground/30 select-none whitespace-pre text-center py-10 px-2"
        style={{
          textShadow: "0 0 8px rgba(168, 130, 255, 0.08)",
          letterSpacing: "0.05em",
        }}
      >
        {HANDS_ART}
      </pre>
      <p className="text-center text-[0.65rem] uppercase tracking-[0.35em] text-foreground/40 pb-6 font-mono">
        Khushi Jain — AI Portfolio · Resume · Contact
      </p>
    </footer>
  );
}
