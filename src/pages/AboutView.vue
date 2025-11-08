<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-blue-900 relative">
    <!-- Background blur effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="hidden absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/10 dark:bg-pink-500/5 rounded-full blur-3xl"></div>
    </div>
    
    <!-- Content overlay -->
    <div class="relative z-10">
    <!-- Hero Section -->
    <section class="py-20 relative">
      <div class="absolute inset-0 bg-white/30 dark:bg-black/10 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-medium text-gray-900 dark:text-white mb-4 animate-fade-in drop-shadow-lg">
          关于我
        </h1>
        <p class="text-gray-700 dark:text-gray-200 animate-fade-in-delay drop-shadow-sm">
          喵喵喵~
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-20 relative">
      <div class="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-sm"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <!-- Profile Image -->
          <div class="lg:col-span-1">
            <div class="sticky top-8">
              <div class="text-center animate-fade-in-up">
                <img
                  :src="aboutData.avatar"
                  :alt="aboutData.fullName"
                  class="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                />
                <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  {{ aboutData.fullName }}
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {{ aboutData.title }}
                </p>
                <div class="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mb-6">
                  <MapPin class="w-3 h-3 mr-1" />
                  {{ aboutData.location }}
                </div>
                
                <div class="space-y-3">
                  <a
                    :href="`mailto:${aboutData.contactEmail}`"
                    class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    <Mail class="w-4 h-4 mr-2" />
                    Email Me
                  </a>
                  
                  <div class="flex justify-center space-x-3">
                    <a
                      v-for="link in aboutData.socialLinks"
                      :key="link.platform"
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="social-link text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      :aria-label="link.platform"
                    >
                      <component :is="getIcon(link.icon)" class="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Content -->
          <div class="lg:col-span-3 space-y-12">
            <!-- Bio Section -->
            <div 
              class="relative animate-fade-in-up bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-gray-300/40 dark:border-white/20 shadow-xl"
              :ref="el => aboutCardRefs[0] = el as HTMLElement"
              @mousemove="(event) => handleAboutCardMouseMove(event, 0)"
              @mouseleave="() => handleAboutCardMouseLeave(0)"
            >
              <!-- 鼠标跟随效果 -->
              <div 
                v-if="aboutCardEffects[0]?.show"
                class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0"
                :style="{
                  left: aboutCardEffects[0]?.x - 80 + 'px',
                   top: aboutCardEffects[0]?.y - 80 + 'px',
                   background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 30%, rgba(59, 130, 246, 0.15) 60%, transparent 90%)',
                   boxShadow: '0 0 80px rgba(59, 130, 246, 0.5), 0 0 160px rgba(59, 130, 246, 0.3)'
                }"
              ></div>
              <h3 class="relative z-10 text-xl font-medium text-gray-900 dark:text-white mb-4 drop-shadow-lg">关于我</h3>
              <div class="relative z-10 text-gray-700 dark:text-gray-200 space-y-4 leading-relaxed">
                <p class="drop-shadow-sm">
                  {{ aboutData.bio }}
                </p>
              </div>
            </div>
            
            
            <!-- Interests -->
            <div 
              class="relative animate-fade-in-up bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-gray-300/40 dark:border-white/20 shadow-xl"
              :ref="el => aboutCardRefs[3] = el as HTMLElement"
              @mousemove="(event) => handleAboutCardMouseMove(event, 3)"
              @mouseleave="() => handleAboutCardMouseLeave(3)"
            >
              <!-- 鼠标跟随效果 -->
              <div 
                v-if="aboutCardEffects[3]?.show"
                class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0"
                :style="{
                  left: aboutCardEffects[3]?.x - 80 + 'px',
                   top: aboutCardEffects[3]?.y - 80 + 'px',
                   background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0.3) 30%, rgba(236, 72, 153, 0.15) 60%, transparent 90%)',
                   boxShadow: '0 0 80px rgba(236, 72, 153, 0.5), 0 0 160px rgba(236, 72, 153, 0.3)'
                }"
              ></div>              <h3 class="relative z-10 text-xl font-medium text-gray-900 dark:text-white mb-4 drop-shadow-lg">兴趣爱好</h3>
              <div class="relative z-10 flex flex-wrap gap-3">
                <div
                  v-for="interest in aboutData.interests"
                  :key="interest.name"
                  class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white cursor-default bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/30 dark:border-white/10"
                >
                  <component :is="getIcon(interest.icon)" class="w-4 h-4 drop-shadow-sm" />
                  <span class="text-sm drop-shadow-sm">{{ interest.name }}</span>
                </div>
              </div>
            </div>

            <!-- 技术栈 -->
            <div 
              class="relative animate-fade-in-up bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-gray-300/40 dark:border-white/20 shadow-xl"
              :ref="el => aboutCardRefs[5] = el as HTMLElement"
              @mousemove="(event) => handleAboutCardMouseMove(event, 5)"
              @mouseleave="() => handleAboutCardMouseLeave(5)"
            >
              <!-- 鼠标跟随效果 -->
              <div 
                v-if="aboutCardEffects[5]?.show"
                class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0"
                :style="{
                  left: aboutCardEffects[5]?.x - 80 + 'px',
                   top: aboutCardEffects[5]?.y - 80 + 'px',
                   background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 30%, rgba(59, 130, 246, 0.15) 60%, transparent 90%)',
                   boxShadow: '0 0 80px rgba(59, 130, 246, 0.5), 0 0 160px rgba(59, 130, 246, 0.3)'
                }"
              ></div>
              <h3 class="relative z-10 text-xl font-medium text-gray-900 dark:text-white mb-4 drop-shadow-lg">技术栈</h3>
              <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- 语言 -->
                <div>
                  <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-base drop-shadow-sm">语言</h4>
                  <div class="flex flex-wrap gap-3">
                    <div
                      v-for="lang in aboutData.techStack.languages"
                      :key="lang.name"
                      class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white cursor-default bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/30 dark:border-white/10"
                    >
                      <Icon :icon="lang.icon" class="w-4 h-4 drop-shadow-sm" />
                      <span class="text-sm drop-shadow-sm">{{ lang.name }}</span>
                    </div>
                  </div>
                </div>
                <!-- 工具 -->
                <div>
                  <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-base drop-shadow-sm">工具</h4>
                  <div class="flex flex-wrap gap-3">
                    <div
                      v-for="tool in aboutData.techStack.tools"
                      :key="tool.name"
                      class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white cursor-default bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/30 dark:border-white/10"
                    >
                      <Icon :icon="tool.icon" class="w-4 h-4 drop-shadow-sm" />
                      <span class="text-sm drop-shadow-sm">{{ tool.name }}</span>
                    </div>
                  </div>
                </div>
                <!-- 平台 -->
                <div>
                  <h4 class="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-base drop-shadow-sm">平台</h4>
                  <div class="flex flex-wrap gap-3">
                    <div
                      v-for="service in aboutData.techStack.services"
                      :key="service.name"
                      class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white cursor-default bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-xl px-3 py-2 border border-gray-200/30 dark:border-white/10"
                    >
                      <Icon :icon="service.icon" class="w-4 h-4 drop-shadow-sm" />
                      <span class="text-sm drop-shadow-sm">{{ service.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <!-- Education -->
            <div 
              class="relative animate-fade-in-up bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-gray-300/40 dark:border-white/20 shadow-xl"
              :ref="el => aboutCardRefs[2] = el as HTMLElement"
              @mousemove="(event) => handleAboutCardMouseMove(event, 2)"
              @mouseleave="() => handleAboutCardMouseLeave(2)"
            >
              <!-- 鼠标跟随效果 -->
              <div 
              v-if="aboutCardEffects[2]?.show"
              class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0"
              :style="{
                left: aboutCardEffects[2]?.x - 80 + 'px',
                 top: aboutCardEffects[2]?.y - 80 + 'px',
                 background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0.3) 30%, rgba(168, 85, 247, 0.15) 60%, transparent 90%)',
                 boxShadow: '0 0 80px rgba(168, 85, 247, 0.5), 0 0 160px rgba(168, 85, 247, 0.3)'
              }"
              ></div>
              <h3 class="relative z-10 text-xl font-medium text-gray-900 dark:text-white mb-4 drop-shadow-lg">教育经历</h3>
              <div class="relative z-10 space-y-6">
              <div v-if="aboutData.education && aboutData.education.length">
                <div v-for="(edu, idx) in aboutData.education" :key="idx" class="relative flex items-start timeline-item hover:bg-white/40 dark:hover:bg-white/5 rounded-lg p-3 -m-3 backdrop-blur-sm">
  <span class="absolute right-4 top-4 text-sm text-gray-600 dark:text-gray-300 drop-shadow-sm">
    {{ edu.period }}
  </span>
  <div class="flex-shrink-0">
    <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"></div>
  </div>
  <div class="ml-4 w-full">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
      <h4 class="font-medium text-gray-900 dark:text-white drop-shadow-sm">{{ edu.degree }} - {{ edu.institution }}</h4>
    </div>
    <p class="text-gray-700 dark:text-gray-200 text-sm leading-relaxed drop-shadow-sm">{{ edu.description }}</p>
  </div>
</div>
              </div>
              <div v-else class="flex items-start">
                <div class="flex-shrink-0">
                <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"></div>
                </div>
                <div class="ml-4">
                <h4 class="font-medium text-gray-900 dark:text-white mb-1 drop-shadow-sm">暂无数据</h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-2 drop-shadow-sm">请在 aboutData.json 中补充 education 字段</p>
                <p class="text-gray-700 dark:text-gray-200 text-sm leading-relaxed drop-shadow-sm">
                  你可以在 data/AboutView.json 添加 education 信息
                </p>
                </div>
              </div>
              </div>
            </div>
            
            
            
            

            <!-- Experience Timeline -->
            <div 
              class="relative animate-fade-in-up bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-gray-300/40 dark:border-white/20 shadow-xl"
              :ref="el => aboutCardRefs[1] = el as HTMLElement"
              @mousemove="(event) => handleAboutCardMouseMove(event, 1)"
              @mouseleave="() => handleAboutCardMouseLeave(1)"
            >
              <!-- 鼠标跟随效果 -->
              <div 
                v-if="aboutCardEffects[1]?.show"
                class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0"
                :style="{
                  left: aboutCardEffects[1]?.x - 80 + 'px',
                   top: aboutCardEffects[1]?.y - 80 + 'px',
                   background: 'radial-gradient(circle, rgba(34, 197, 94, 0.6) 0%, rgba(34, 197, 94, 0.3) 30%, rgba(34, 197, 94, 0.15) 60%, transparent 90%)',
                   boxShadow: '0 0 80px rgba(34, 197, 94, 0.5), 0 0 160px rgba(34, 197, 94, 0.3)'
                }"
              ></div>
              <h3 class="relative z-10 text-xl font-medium text-gray-900 dark:text-white mb-4 drop-shadow-lg">站点历程</h3>
              <div class="relative z-10 space-y-6">
                <div v-for="(experience, index) in aboutData.experiences" :key="index" class="relative timeline-item hover:bg-white/40 dark:hover:bg-white/5 rounded-lg p-3 -m-3 backdrop-blur-sm">
  <div class="timeline-content relative">
    <span class="absolute right-4 top-4 text-sm text-gray-600 dark:text-gray-300 drop-shadow-sm">
      {{ experience.period }}
    </span>
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <div class="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 timeline-dot"></div>
      </div>
      <div class="ml-4">
        <div class="pb-6">
          <h4 class="font-medium text-gray-900 dark:text-white drop-shadow-sm">{{ experience.position }}</h4>
          <p class="text-gray-700 dark:text-gray-200 text-sm mb-2 mt-2 drop-shadow-sm">{{ experience.company }}</p>
          <p class="text-gray-700 dark:text-gray-200 text-sm leading-relaxed drop-shadow-sm">{{ experience.description }}</p>
        </div>
      </div>
    </div>
    <div v-if="index < aboutData.experiences.length - 1" class="absolute left-1 top-4 w-px h-6 bg-gray-200 dark:bg-gray-700 timeline-line"></div>
  </div>
</div>
              </div>
            </div>

            <!-- Contact Section -->
            <div 
              class="relative animate-fade-in-up bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-gray-300/40 dark:border-white/20 shadow-xl"
              :ref="el => aboutCardRefs[4] = el as HTMLElement"
              @mousemove="(event) => handleAboutCardMouseMove(event, 4)"
              @mouseleave="() => handleAboutCardMouseLeave(4)"
            >
              <!-- 鼠标跟随效果 -->
              <div 
                v-if="aboutCardEffects[4]?.show"
                class="absolute w-40 h-40 rounded-full blur-2xl transition-all duration-75 ease-out pointer-events-none z-0"
                :style="{
                  left: aboutCardEffects[4]?.x - 80 + 'px',
                   top: aboutCardEffects[4]?.y - 80 + 'px',
                   background: 'radial-gradient(circle, rgba(245, 101, 101, 0.6) 0%, rgba(245, 101, 101, 0.3) 30%, rgba(245, 101, 101, 0.15) 60%, transparent 90%)',
                   boxShadow: '0 0 80px rgba(245, 101, 101, 0.5), 0 0 160px rgba(245, 101, 101, 0.3)'
                }"
              ></div>
              <h3 class="relative z-10 text-xl font-medium text-gray-900 dark:text-white mb-4 drop-shadow-lg">联系我</h3>
              <div class="relative z-10 space-y-3">
                <div class="flex items-center text-gray-700 dark:text-gray-200">
                  <Mail class="w-4 h-4 mr-3 drop-shadow-sm" />
                  <a 
                    :href="`mailto:${aboutData.contactEmail}`"
                    class="hover:text-blue-500 dark:hover:text-blue-400 hover:underline drop-shadow-sm"
                  >
                    {{ aboutData.contactEmail }}
                  </a>
                </div>
                <div class="flex items-center text-gray-700 dark:text-gray-200">
                  <MapPin class="w-4 h-4 mr-3 drop-shadow-sm" />
                  <span class="drop-shadow-sm">{{ aboutData.location }}</span>
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { MapPin, Mail, Github, Linkedin, Twitter, MessageCircle, Code, Music, Gamepad2 , Camera , Radio , Film } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
import aboutData from '@/data/AboutView.json'

const aboutCardRefs = ref<HTMLElement[]>([])
const aboutCardEffects = reactive<Record<number, { x: number; y: number; show: boolean }>>({})

const handleAboutCardMouseMove = (event: MouseEvent, index: number) => {
  const card = aboutCardRefs.value[index]
  if (!card) return
  
  const rect = card.getBoundingClientRect()
  aboutCardEffects[index] = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    show: true
  }
}

const handleAboutCardMouseLeave = (index: number) => {
  if (aboutCardEffects[index]) {
    aboutCardEffects[index].show = false
  }
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  code: Code,
  music: Music,
  gamepad2: Gamepad2,
  globe: MessageCircle,
  camera: Camera,
  radio: Radio,
  film: Film
}

const getIcon = (iconName: string) => {
  // 如果是iconMap中的图标，返回lucide图标
  if (iconName in iconMap) {
    return iconMap[iconName as keyof typeof iconMap]
  }
  // 否则返回iconify的Icon组件（用于技术栈）
  return Icon
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.6s ease-out 0.2s both;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.timeline-item {
  animation: fadeInUp 0.6s ease-out;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }
.timeline-item:nth-child(6) { animation-delay: 0.6s; }

.timeline-line {
  animation: drawLine 0.8s ease-out;
  transform-origin: top;
}

@keyframes drawLine {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
</style>