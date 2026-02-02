import React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  CheckCircle2, 
  Clock,
  Shield,
  TrendingDown,
  HeartHandshake,
  Zap,
  Star,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"

function useScrollAnimation() {
  const [visibleElements, setVisibleElements] = useState<string[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visibleElements.includes(entry.target.id)) {
            setVisibleElements((prev) => [...prev, entry.target.id])
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [visibleElements])

  return visibleElements
}

const WHATSAPP_URL = "https://wa.me/5561984074500?text=Olá, quero falar com um contador da Ágil Contabilidade."

// Header com Menu Dinâmico
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const pageHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const distanceFromBottom = pageHeight - (currentScrollY + windowHeight)

      // Mostrar header no topo (primeiros 100px) e nos últimos 500px
      if (currentScrollY < 100 || distanceFromBottom < 500) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: "Início", href: "#" },
    { label: "Serviços", href: "#servicos" },
    { label: "Para quem", href: "#para-quem" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Localização", href: "#localizacao" },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-lg border-b border-primary/20 transition-all duration-300 ${
      showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - Esquerda */}
        <div className="flex-shrink-0 flex items-center">
          <img
            src="/images/logo.png"
            alt="Ágil Contabilidade"
            width={150}
            height={50}
            className="hover:opacity-80 transition-opacity"
          />
        </div>

        {/* Desktop Menu - Direita */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-white/80 hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium rounded-lg text-sm"
              onClick={(e) => {
                e.preventDefault()
                if (item.href === '#') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  const element = document.querySelector(item.href)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-primary/20">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-white/80 hover:text-primary hover:bg-primary/10 transition-all duration-200 font-medium rounded-lg"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(item.href)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                  setIsMenuOpen(false)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

// Botão Flutuante WhatsApp
function FloatingWhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      title="Fale conosco no WhatsApp"
    >
      <img src="/images/whatsapp.png" alt="WhatsApp" className="w-16 h-16" />
    </a>
  )
}

function CTAButton({ children, className = "", size = "lg" }: { children: React.ReactNode; className?: string; size?: "default" | "lg" }) {
  return (
    <Button 
      asChild 
      size={size}
      className={`bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
    >
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
        <img src="/images/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
        {children}
      </a>
    </Button>
  )
}

// 1. Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-office.png"
          alt="Escritório Ágil Contabilidade"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
            Contabilidade Estratégica para Quem Quer{" "}
            <span className="text-yellow-400" style={{color: '#D4A726'}}>Crescer em Brasília</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty">
            Reduza impostos legalmente, evite problemas fiscais e tenha um contador que realmente acompanha o seu negócio.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              "Atendimento humanizado",
              "Mais de 20 anos de experiência",
              "Suporte completo para empresas e pessoa física",
              "Atendimento rápido e personalizado"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{color: '#D4A726'}} />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>

          <CTAButton className="text-lg px-8 py-6 h-auto">
            Falar com um contador agora
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

// 2. Pain + Solution Section
function PainSolutionSection() {
  const visibleElements = useScrollAnimation()
  const pains = [
    "Impostos pagos de forma errada",
    "Falta de organização financeira",
    "Medo de multas e fiscalização",
    "Contador que não responde"
  ]

  return (
    <section id="pain-solution" data-animate className={`py-20 bg-card transition-all duration-700 ${
      visibleElements.includes('pain-solution') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">
              Problemas com contabilidade estão{" "}
              <span className="text-primary">travando o seu crescimento?</span>
            </h2>

            <ul className="space-y-4 mb-8">
              {pains.map((pain, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-destructive text-sm font-bold">!</span>
                  </div>
                  <span className="text-lg text-muted-foreground">{pain}</span>
                </li>
              ))}
            </ul>

            <div className="bg-muted p-6 rounded-lg border-l-4 border-primary mb-8">
              <p className="text-lg text-foreground">
                <strong>A Ágil Contabilidade resolve isso</strong> com estratégia, acompanhamento e clareza. 
                Você foca no seu negócio, nós cuidamos da sua contabilidade.
              </p>
            </div>

            <CTAButton>
              Quero resolver minha contabilidade
            </CTAButton>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/problems-team.png"
                alt="Equipe Ágil Contabilidade"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
              <p className="text-4xl font-bold">20+</p>
              <p className="text-sm">anos de experiência</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 3. Services Section
function ServicesSection() {
  const visibleElements = useScrollAnimation()
  const services = [
    {
      title: "Assessoria Contábil",
      description: "Organização contábil completa para sua empresa crescer com segurança.",
      image: "/images/service-assessoria.jpg",
      cta: "Solicitar atendimento"
    },
    {
      title: "Planejamento Tributário",
      description: "Pague menos impostos de forma legal e inteligente.",
      image: "/images/service-tributario.jpg",
      cta: "Quero reduzir impostos"
    },
    {
      title: "Departamento Pessoal",
      description: "Folha de pagamento, admissões e e-Social sem dor de cabeça.",
      image: "/images/service-dp.jpg",
      cta: "Falar com especialista"
    },
    {
      title: "Abertura de Empresas",
      description: "Abra, regularize ou reorganize sua empresa com suporte completo.",
      image: "/images/service-abertura.jpg",
      cta: "Abrir minha empresa"
    },
    {
      title: "Imposto de Renda PF",
      description: "Declaração correta e restituição sem riscos.",
      image: "/images/service-irpf.jpg",
      cta: "Declarar meu IR"
    },
    {
      title: "Consultoria Estratégica",
      description: "Análise financeira e orientação para tomada de decisões.",
      image: "/images/service-consultoria.jpg",
      cta: "Quero uma consultoria"
    }
  ]

  return (
    <section id="servicos" data-animate className={`py-20 bg-muted transition-all duration-700 ${
      visibleElements.includes('servicos') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções completas para sua empresa ou suas finanças pessoais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-secondary-foreground">
                  {service.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <CTAButton size="default" className="w-full">
                  {service.cta}
                </CTAButton>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <CTAButton className="text-lg px-10">
            Quero atendimento contábil agora
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

// 4. Target Audience Section
function TargetAudienceSection() {
  const visibleElements = useScrollAnimation()
  const audiences = [
    { image: "/images/persona-empreendedor.jpg", label: "Empreendedores", description: "Comércio e serviços" },
    { image: "/images/persona-mei.jpg", label: "MEIs", description: "Microempreendedores individuais" },
    { image: "/images/persona-profissional.jpg", label: "Profissionais Liberais", description: "Médicos, advogados, consultores" },
    { image: "/images/persona-novonegocio.jpg", label: "Novos Negócios", description: "Quem está começando" },
    { image: "/images/persona-empresa.jpg", label: "Empresas", description: "Pequeno e médio porte" },
    { image: "/images/persona-pf.jpg", label: "Pessoa Física", description: "Imposto de Renda e mais" }
  ]

  return (
    <section id="para-quem" data-animate className={`py-20 bg-card transition-all duration-700 ${
      visibleElements.includes('para-quem') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Para <span className="text-primary">quem</span> é?
          </h2>
          <p className="text-lg text-muted-foreground">
            Atendemos diversos perfis com soluções personalizadas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {audiences.map((audience, index) => (
            <div 
              key={index} 
              className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={audience.image}
                  alt={audience.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-bold text-secondary-foreground text-lg">{audience.label}</p>
                  <p className="text-secondary-foreground/80 text-sm">{audience.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton>
            Esse atendimento é para mim
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

// 5. Differentials Section
function DifferentialsSection() {
  const visibleElements = useScrollAnimation()
  const differentials = [
    { icon: Clock, title: "Mais de 20 anos", description: "de experiência no mercado" },
    { icon: HeartHandshake, title: "Atendimento humanizado", description: "você fala com pessoas, não robôs" },
    { icon: TrendingDown, title: "Redução de impostos", description: "de forma legal e estratégica" },
    { icon: Shield, title: "Acompanhamento", description: "personalizado do seu negócio" },
    { icon: Zap, title: "Atendimento rápido", description: "respostas em até 24h úteis" }
  ]

  return (
    <section id="diferenciais" data-animate className={`py-20 bg-secondary text-secondary-foreground transition-all duration-700 ${
      visibleElements.includes('diferenciais') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que escolher a{" "}
            <span className="text-primary">Ágil Contabilidade?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {differentials.map((diff, index) => (
            <div 
              key={index} 
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <diff.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{diff.title}</h3>
              <p className="text-secondary-foreground/70 text-sm">{diff.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton>
            Quero esse nível de atendimento
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

// 6. Social Proof Section
function SocialProofSection() {
  const visibleElements = useScrollAnimation()
  const testimonials = [
    {
      name: "Carlos M.",
      role: "Empresário",
      text: "Excelente atendimento! Reduziram meus impostos em mais de 30%. Recomendo muito a Ágil Contabilidade.",
      rating: 5
    },
    {
      name: "Ana Paula S.",
      role: "Profissional Liberal",
      text: "Finalmente encontrei um contador que responde rápido e explica tudo com clareza. Muito satisfeita!",
      rating: 5
    },
    {
      name: "Roberto L.",
      role: "Dono de Restaurante",
      text: "Abri minha empresa com eles e nunca tive problema. Suporte completo do início ao fim.",
      rating: 5
    }
  ]

  return (
    <section id="depoimentos" data-animate className={`py-20 bg-card transition-all duration-700 ${
      visibleElements.includes('depoimentos') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quem confia na{" "}
            <span className="text-primary">Ágil Contabilidade</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja o que nossos clientes dizem sobre nosso trabalho
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border-0 shadow-lg">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <CTAButton>
            Quero ser atendido agora
          </CTAButton>
        </div>
      </div>
    </section>
  )
}

// 7. Location Section
function LocationSection() {
  const visibleElements = useScrollAnimation()
  return (
    <section id="localizacao" data-animate className={`py-20 bg-muted scroll-mt-20 transition-all duration-700 ${
      visibleElements.includes('localizacao') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Atendimento em{" "}
              <span className="text-primary">Águas Claras - DF</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Atendimento presencial em Águas Claras e suporte para todo o Distrito Federal. 
              Estamos prontos para ajudar sua empresa a crescer.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Endereço</p>
                  <p className="text-muted-foreground">QS 01 – ED. Connect Towers – Sala 1227 – Águas Claras/DF</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">Telefone / WhatsApp</p>
                  <p className="text-muted-foreground">(61) 98407-4500</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground">E-mail</p>
                  <p className="text-muted-foreground">contato@assessoriacontabilagil.com.br</p>
                </div>
              </div>
            </div>

            <CTAButton>
              Entrar em contato agora
            </CTAButton>
          </div>

          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.3076000529736!2d-48.044993299999994!3d-15.840422399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a333af3d33aa7%3A0x3fe7a8d8b50dacbe!2sAgil%20Contabilidade%20%7C%20Contabilidade%20em%20%C3%81guas%20Claras%20-%20DF!5e0!3m2!1spt-BR!2sbr!4v1769469380208!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Ágil Contabilidade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// 8. Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="/images/logo.png"
            alt="Ágil Contabilidade"
            width={150}
            height={50}
            className="mx-auto mb-8 brightness-0 invert"
          />
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6 text-balance">
            Fale agora com um contador e{" "}
            <span className="text-primary">resolva sua contabilidade</span>
          </h2>
          
          <p className="text-xl text-secondary-foreground/80 mb-10">
            Não deixe sua contabilidade para depois. Converse com nossa equipe e descubra como podemos ajudar.
          </p>

          <CTAButton className="text-xl px-12 py-7 h-auto">
            Agendar atendimento pelo WhatsApp
          </CTAButton>

          <p className="mt-6 text-secondary-foreground/60 text-sm">
            Atendimento de segunda a sexta, das 8h às 18h
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/images/logo.png"
              alt="Ágil Contabilidade"
              width={100}
              height={33}
            />
            <span className="text-background/60">|</span>
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Ágil Contabilidade. Todos os direitos reservados.
            </p>
          </div>
          <p className="text-background/60 text-sm">
            Águas Claras - Brasília/DF
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function Home() {
  return (
    <>
      <Header />
      <FloatingWhatsAppButton />
      <HeroSection />
      <PainSolutionSection />
      <ServicesSection />
      <TargetAudienceSection />
      <DifferentialsSection />
      <SocialProofSection />
      <LocationSection />
      <FinalCTASection />
      <Footer />
    </>
  )
}
