<script lang="ts">
  export let componentNames: string[] = []
  let selected: string | undefined
</script>

<div class="h-screen flex overflow-hidden bg-white text-gray-900">
  <div
    class="flex
  flex-shrink-0 border-r border-gray-200"
  >
    <div class="flex flex-col w-48">
      <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <h2 class="font-light text-xl">Vite Preview</h2>
        </div>
        <div class="mt-5 flex-1 flex flex-col">
          <nav class="flex-1 px-2 space-y-1">
            {#each componentNames as name}
              <a
                href={`__preview?${name}`}
                on:click|preventDefault={() => (selected = name)}
                v-for="name in previewNames"
                class={`hover:text-gray-900 group flex items-center px-2 py-2 text-base leading-tight rounded-md ${
                  selected === name ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {name}
              </a>
            {/each}
          </nav>
        </div>
      </div>
    </div>
  </div>
  <main class="flex-1 relative overflow-y-auto focus:outline-none">
    <div class="py-5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex">
        <h1 class="text-2xl leading-none text-gray-900">
          {selected ? selected : 'Select Component...'}
        </h1>
        {#if selected}
          <a
            href={`__preview_iframe.html?${selected ?? ''}`}
            target="_blank"
            class="ml-2"
            title="Open new tab"
          >
            <svg width="1em" height="1em" viewBox="0 0 32 32"
              ><path
                d="M18 5v2h5.563L11.28 19.281l1.438 1.438L25 8.437V14h2V5zM5 9v18h18V14l-2 2v9H7V11h9l2-2z"
                fill="currentColor"
              /></svg
            >
          </a>
        {/if}
      </div>
      <div class="max-w-7xl mx-auto mt-4 px-4 sm:px-6 md:px-8">
        <div
          class="flex border-2 border-dashed border-gray-200 rounded-lg h-90vh"
        >
          {#if selected}
            <iframe
              src={`__preview_iframe.html?${selected}`}
              frameborder="0"
              width="100%"
              height="100%"
              title={selected}
            />
          {/if}
        </div>
      </div>
    </div>
  </main>
</div>
